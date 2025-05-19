import { run } from "./run.ts";

const files = Deno.args;

try {
  await run(["deno", "lint", "--fix", ...files]);
  await run(["deno", "task", "eslint-fix", ...files]);
  await run(["deno", "task", "dprint-fmt", ...files]);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error("✖ An unknown error occurred.");
  }
}
