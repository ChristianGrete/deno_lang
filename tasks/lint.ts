/**
 * Runs all linters on the given files.
 *
 * Usage: `deno task lint [files...]`
 */

import { bold, dim, red } from "@std/fmt/colors";

import { run } from "./run.ts";

if (import.meta.main) {
  const files = Deno.args;

  try {
    await run(["deno", "lint", "-q", ...files]);
    await run(["deno", "task", "eslint", "--quiet", ...files]);
    await run(["deno", "task", "dprint-check", "-L warn", ...files]);
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
