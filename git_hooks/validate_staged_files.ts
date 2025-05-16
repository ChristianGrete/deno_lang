/**
 * Git pre-commit hook script to check and format staged files.
 *
 * - Skips partially staged files to avoid corrupting selective commits
 * - Skips deleted files
 * - Applies `deno check`, `deno lint --fix`, and `dprint fmt` to clean files
 * - Re-stages modified files after formatting
 * - Exits non-zero if any tool fails
 */

const decoder = new TextDecoder();

/**
 * Get all currently staged files (as file paths).
 */
function getStagedFiles(): Promise<string[]> {
  return new Deno.Command("git", { args: ["diff", "--name-only", "--cached"], stdout: "piped" }).output().then((
    { stdout },
  ) => decoder.decode(stdout).split("\n").map((f) => f.trim()).filter(Boolean));
}

/**
 * Get files that are partially staged (mixed index & working tree).
 * Uses `--numstat` to detect entries with `-\t-` lines.
 */
function getPartiallyStagedFiles(): Promise<string[]> {
  return new Deno.Command("git", { args: ["diff", "--cached", "--numstat"], stdout: "piped" }).output().then((
    { stdout },
  ) =>
    decoder
      .decode(stdout)
      .split("\n")
      .filter((line) => line.trim().startsWith("-\t-"))
      .map((line) => line.trim().split("\t").pop() ?? "")
      .filter(Boolean)
  );
}

/**
 * Get all staged files that are marked as deleted.
 */
function getDeletedFiles(): Promise<string[]> {
  return new Deno.Command("git", { args: ["diff", "--cached", "--diff-filter=D", "--name-only"], stdout: "piped" })
    .output()
    .then(({ stdout }) => decoder.decode(stdout).split("\n").map((f) => f.trim()).filter(Boolean));
}

const stagedFiles = await getStagedFiles();
const partialFiles = await getPartiallyStagedFiles();
const deletedFiles = await getDeletedFiles();

if (stagedFiles.length === 0) {
  console.log("✅  No staged files to check.");
  Deno.exit(0);
}

if (partialFiles.length > 0) {
  console.warn("⚠️  The following files are partially staged and will be skipped:");
  for (const file of partialFiles) console.warn(`  - ${file}`);
}

if (deletedFiles.length > 0) {
  console.warn("⚠️  The following files are staged for deletion and will be skipped:");
  for (const file of deletedFiles) console.warn(`  - ${file}`);
}

const cleanFiles = stagedFiles.filter((f) => !partialFiles.includes(f) && !deletedFiles.includes(f));
const tsFiles = cleanFiles.filter((f) => f.endsWith(".ts"));
const dprintFiles = cleanFiles.filter((f) => f.match(/\.(json|md|ts|yml)$/));

if (tsFiles.length > 0) {
  console.log("🔎  Running deno check...");
  const check = new Deno.Command("deno", { args: ["check", ...tsFiles], stdout: "inherit", stderr: "inherit" });
  const { code: checkCode } = await check.spawn().status;
  if (checkCode !== 0) Deno.exit(checkCode);

  console.log("🧹  Running deno lint --fix...");
  const lint = new Deno.Command("deno", { args: ["lint", "--fix", ...tsFiles], stdout: "inherit", stderr: "inherit" });
  const { code: lintCode } = await lint.spawn().status;
  if (lintCode !== 0) Deno.exit(lintCode);
}

if (dprintFiles.length > 0) {
  console.log("🖋️  Running dprint fmt...");
  const fmt = new Deno.Command("deno", {
    args: ["run", "-A", "npm:dprint", "fmt", ...dprintFiles],
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code: fmtCode } = await fmt.spawn().status;
  if (fmtCode !== 0) Deno.exit(fmtCode);
}

/**
 * After formatting, determine which files have unstaged changes,
 * and re-stage them to ensure they are included in the commit.
 */
const diffCmd = new Deno.Command("git", { args: ["diff", "--name-only"], stdout: "piped" });
const { stdout: diffOut } = await diffCmd.output();

const changed = decoder.decode(diffOut).split("\n").map((f) => f.trim()).filter((f) =>
  f.length > 0 && cleanFiles.includes(f)
);

if (changed.length > 0) {
  console.log("🔁  Re-staging changed files...");
  const restage = new Deno.Command("git", { args: ["add", ...changed], stdout: "null", stderr: "null" });
  await restage.spawn().status;
}

Deno.exit(0);
