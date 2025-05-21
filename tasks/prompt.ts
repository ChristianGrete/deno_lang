/**
 * Runs a named prompt script from ./gpt_prompts.
 *
 * Usage: `deno task prompt <prompt> <args...>`
 */

import { bold, dim, green, italic, red } from "@std/fmt/colors";

const usage = (code: number): never => {
  console.info(`${green("Usage:")} deno task prompt ${italic("<prompt> <args...>")}`);

  Deno.exit(code);
};

const isHelpFlag = (arg: string): boolean => ["-h", "--help", "help"].includes(arg.toLowerCase());

if (import.meta.main) {
  const [prompt, ...args] = Deno.args;

  if (!prompt) usage(1);

  if (isHelpFlag(prompt)) usage(0);

  const promptPath = `./gpt_prompts/${prompt}.ts`;

  try {
    const fileInfo = await Deno.stat(promptPath);

    if (!fileInfo.isFile) {
      console.error(`${bold(red("Error"))} ${dim("Failed to run task 'prompt':")}`);
      console.error(red(`Um... '${promptPath}' exists but is not a file?`));

      Deno.exit(1);
    }
  } catch {
    console.error(`${bold(red("Error"))} ${dim("Failed to run task 'prompt':")}`);
    console.error(red(`File '${promptPath}' not found. Make sure the prompt exists.`));

    Deno.exit(1);
  }

  const cmd = new Deno.Command("deno", {
    args: ["run", "-A", promptPath, ...args],
    stderr: "inherit",
    stdin: "inherit",
    stdout: "inherit",
  });

  const { code } = await cmd.output();

  Deno.exit(code);
}
