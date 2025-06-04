/**
 * Runs all linters on the given files.
 *
 * Usage: `deno task lint [files...]`
 */

import { bold, dim, red } from "@std/fmt/colors";
import { extname } from "@std/path";

import { run } from "./run.ts";

export const filterFilesForLinters = (allFiles: string[]) => {
  const dprintFiles: string[] = [];
  const eslintFiles: string[] = [];
  const hasNoFiles = allFiles.length === 0;
  const ignoredFiles: string[] = [];
  const lintFiles: string[] = [];

  if (!hasNoFiles) {
    for (const file of allFiles) {
      switch (extname(file).toLowerCase()) {
        case ".ts":
          lintFiles.push(file);
          // fallthrough into ".json" case
        case ".json":
          eslintFiles.push(file);
          dprintFiles.push(file);
          break;
        case ".md":
        case ".yml":
          dprintFiles.push(file);
          break;
        default:
          ignoredFiles.push(file);
      }
    }
  }

  return { allFiles, dprintFiles, eslintFiles, hasNoFiles, ignoredFiles, lintFiles };
};

if (import.meta.main) {
  const { dprintFiles, eslintFiles, hasNoFiles, lintFiles } = filterFilesForLinters(Deno.args);

  try {
    if (hasNoFiles || lintFiles.length > 0) await run(["deno", "lint", "-q", ...lintFiles]);

    if (hasNoFiles || eslintFiles.length > 0) await run(["deno", "task", "eslint", "--quiet", ...eslintFiles]);

    if (hasNoFiles || dprintFiles.length > 0) await run(["deno", "task", "dprint-check", "-L=warn", ...dprintFiles]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${bold(red("Error"))} ${dim("Failed to run task 'lint':")}`);
      console.error(red(err.message));
    } else {
      console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
    }

    Deno.exit(1);
  }
}
