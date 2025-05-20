/**
 * Runs all code formatters on the given files.
 *
 * Usage: `deno task fmt [files...]`
 */

import { bold, red } from "@std/fmt/colors";

import { run } from "./run.ts";

if (import.meta.main) {
  const files = Deno.args;

  try {
    await run(["deno", "lint", "--fix", ...files], "suppress");
    await run(["deno", "task", "eslint-fix", ...files], "suppress");
    await run(["deno", "task", "dprint-fmt", ...files], "suppress");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${bold(red("Error"))} ${red("Failed to run task 'fmt':")}`);
      console.error(red(err.message));
    } else {
      console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
    }

    Deno.exit(1);
  }
}
