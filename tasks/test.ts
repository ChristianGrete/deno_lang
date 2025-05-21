/**
 * Runs tests for the given files, or all tests by default.
 *
 * If a non-test file is passed, its corresponding *_test.ts file is used (if found).
 *
 * Usage: `deno task test [files...]`
 */

import { bold, dim, green, red } from "@std/fmt/colors";
import { extname, join } from "@std/path";

import { run } from "./run.ts";

if (import.meta.main) {
  const args = Deno.args;
  const extPattern = /\.ts$/;

  const isCatchAll = args.length === 0 ||
    args.some((arg) => [".", "./", "./*", "./**/*", "", "*", "**", "**/*"].includes(arg));

  if (isCatchAll) {
    try {
      await run(["deno", "test", "--parallel"], "suppress");
    } catch (err) {
      if (err instanceof Error) {
        console.error(`${bold(red("Error"))} ${dim("Failed to run task 'test':")}`);
        console.error(red(err.message));
      } else {
        console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
      }

      Deno.exit(1);
    }

    Deno.exit(0);
  }

  const tests = new Set<string>();

  for (const file of args) {
    if (extname(file) !== ".ts") continue;

    if (file.endsWith("_test.ts")) {
      tests.add(file);
    } else {
      const testFile = file.replace(extPattern, "_test.ts");

      try {
        const testPath = join(Deno.cwd(), testFile);
        const stat = await Deno.stat(testPath);

        if (stat.isFile) tests.add(testFile);
      } catch {
        // No matching *_test.ts file - ignore silently
      }
    }
  }

  if (tests.size === 0) {
    console.log(`No tests or testable files provided. ${green("Skipping.")}`);

    Deno.exit(0);
  }

  try {
    await run(["deno", "test", "--parallel", ...Array.from(tests)], "suppress");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`${bold(red("Error"))} ${dim("Failed to run task 'test':")}`);
      console.error(red(err.message));
    } else {
      console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
    }

    Deno.exit(1);
  }
}
