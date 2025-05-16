const decoder = new TextDecoder();

function getStagedFiles(): Promise<string[]> {
  return new Deno.Command("git", { args: ["diff", "--name-only", "--cached"], stdout: "piped" }).output().then((
    { stdout },
  ) => decoder.decode(stdout).split("\n").map((f) => f.trim()).filter(Boolean));
}

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

const stagedFiles = await getStagedFiles();
const partialFiles = await getPartiallyStagedFiles();

if (stagedFiles.length === 0) {
  console.log("✅ No staged files to check.");
  Deno.exit(0);
}

if (partialFiles.length > 0) {
  console.warn("⚠️  The following files are partially staged and will be skipped:");
  for (const file of partialFiles) console.warn(`  - ${file}`);
}

const cleanFiles = stagedFiles.filter((f) => !partialFiles.includes(f));
const tsFiles = cleanFiles.filter((f) => f.endsWith(".ts"));
const dprintFiles = cleanFiles.filter((f) => f.match(/\.(json|md|ts|yml)$/));

if (tsFiles.length > 0) {
  console.log("🔎 Running deno check...");
  const check = new Deno.Command("deno", { args: ["check", ...tsFiles], stdout: "inherit", stderr: "inherit" });
  const { code: checkCode } = await check.spawn().status;
  if (checkCode !== 0) Deno.exit(checkCode);

  console.log("🧹 Running deno lint --fix...");
  const lint = new Deno.Command("deno", { args: ["lint", "--fix", ...tsFiles], stdout: "inherit", stderr: "inherit" });
  const { code: lintCode } = await lint.spawn().status;
  if (lintCode !== 0) Deno.exit(lintCode);
}

if (dprintFiles.length > 0) {
  console.log("🖋️ Running dprint fmt...");
  const fmt = new Deno.Command("deno", {
    args: ["run", "-A", "npm:dprint", "fmt", ...dprintFiles],
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code: fmtCode } = await fmt.spawn().status;
  if (fmtCode !== 0) Deno.exit(fmtCode);
}

const diffCmd = new Deno.Command("git", { args: ["diff", "--name-only"], stdout: "piped" });
const { stdout: diffOut } = await diffCmd.output();

const changed = decoder.decode(diffOut).split("\n").map((f) => f.trim()).filter((f) =>
  f.length > 0 && cleanFiles.includes(f)
);

if (changed.length > 0) {
  console.log("🔁 Re-staging changed files...");
  const restage = new Deno.Command("git", { args: ["add", ...changed], stdout: "null", stderr: "null" });
  await restage.spawn().status;
}

Deno.exit(0);
