import { extname, join } from "@std/path";

import { run } from "./run.ts";

if (import.meta.main) {
  const args = Deno.args;
  const extPattern = /\.ts$/;

  const isCatchAll = args.length === 0 ||
    args.some((arg) => [".", "./", "./*", "./**/*", "", "**", "**/*"].includes(arg));

  if (isCatchAll) {
    try {
      await run(["deno", "test"]);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error("✖ An unknown error occurred.");
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
    console.log("No test files found. Skipping.");

    Deno.exit(0);
  }

  try {
    await run(["deno", "test", ...Array.from(tests)]);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("✖ An unknown error occurred.");
    }

    Deno.exit(1);
  }
}
