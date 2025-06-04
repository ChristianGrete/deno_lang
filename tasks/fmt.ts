/**
 * Runs all code formatters on the given files.
 *
 * Usage: `deno task fmt [files...]`
 */

import { bold, red } from "@std/fmt/colors";

import { filterFilesForLinters as filterFilesForFormatters } from "./lint.ts";
import { run } from "./run.ts";

if (import.meta.main) {
  const { dprintFiles, eslintFiles, hasNoFiles, lintFiles } = filterFilesForFormatters(Deno.args);

  try {
    if (hasNoFiles || lintFiles.length > 0) await run(["deno", "lint", "-q", "--fix", ...lintFiles]);

    if (hasNoFiles || eslintFiles.length > 0) await run(["deno", "task", "eslint-fix", "--quiet", ...eslintFiles]);

    if (hasNoFiles || dprintFiles.length > 0) await run(["deno", "task", "dprint-fmt", "-L=warn", ...dprintFiles]);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${bold(red("Error"))} ${red("Failed to run task 'fmt':")}`);
      console.error(red(err.message));
    } else {
      console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
    }

    Deno.exit(1);
  }
}
