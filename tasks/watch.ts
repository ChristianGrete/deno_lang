/**
 * Runs all linters on the given files.
 *
 * Usage: `deno task watch [--run-tests]`
 */

import { bold, dim, green, red } from "@std/fmt/colors";
import { extname } from "@std/path";

import { run } from "./run.ts";

const DEBOUNCE_TIMEOUT_IN_MS = 5000; // Minimum delay before reprocessing the same file
const relevantFileExtensions = [".json", ".md", ".ts", ".yml"];

if (import.meta.main) {
  const shouldRunTests = Deno.args.includes("--run-tests");

  console.log(`${green("Watch")} ${dim("Started watching files for changes...")}`);

  const watcher = Deno.watchFs("./");
  const recent = new Map<string, number>();

  for await (const { kind, paths } of watcher) {
    if (paths.length < 1 || kind !== "modify") continue;

    const now = Date.now();
    const uniqueFiles = [...new Set(paths)];

    for (const file of uniqueFiles) {
      const ext = extname(file).toLocaleLowerCase();

      if (!relevantFileExtensions.includes(ext)) continue;

      const lastRun = recent.get(file) ?? 0;

      if (now - lastRun < DEBOUNCE_TIMEOUT_IN_MS) continue;

      recent.set(file, now);

      console.log(`${green("Watch")} ${file}`);

      try {
        // Run `deno check <file>` only on TypeScript files
        if (ext === ".ts") {
          console.log(`${green("Watch")} ${dim("Running type checks...")}`);

          await run(["deno", "check", file], "quiet");
        }

        // Run `deno task fmt <file>` on all relevant files (will be filtered by the task)
        console.log(`${green("Watch")} ${dim("Running formatters...")}`);

        await run(["deno", "task", "fmt", file], "quiet");

        // Run `deno task test <file>` if `--run-tests` was passed (will be filtered as well)
        if (shouldRunTests) {
          console.log(`${green("Watch")} ${dim("Running tests (if available)...")}`);

          await run(["deno", "task", "test", file], "quiet");
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(`${bold(red("Error"))} ${dim("Failed to run tasks in watcher:")}`);
          console.error(red(err.message));
        } else {
          console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
        }
      }
    }
  }
}
