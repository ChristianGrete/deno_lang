import { run } from "./run.ts";

const files = Deno.args;

try {
  await run(["deno", "lint", ...files]);
  await run(["deno", "task", "eslint", ...files]);
  await run(["deno", "task", "dprint-check", ...files]);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("✖ An unknown error occurred.");
  }

  Deno.exit(1);
}
