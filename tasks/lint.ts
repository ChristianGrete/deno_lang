import { run } from "./run.ts";

const files = Deno.args;

try {
  await run(["deno", "lint", ...files]);
  await run(["deno", "task", "eslint", ...files]);
  await run(["deno", "task", "dprint-check", ...files]);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error("✖ An unknown error occurred.");
  }
}
