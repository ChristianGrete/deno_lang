/**
 * Generic task proxy to call a GPT prompt tool.
 *
 * Usage: `deno task prompt <tool> <args...>`
 */

function usage(code: number): never {
  console.error("Usage: deno task prompt <tool> <args...>");

  Deno.exit(code);
}

function isHelpFlag(arg: string): boolean {
  return ["-h", "--help", "help"].includes(arg.toLowerCase());
}

if (import.meta.main) {
  const [prompt, ...args] = Deno.args;

  if (!prompt) usage(1);

  if (args.some(isHelpFlag)) usage(0);

  const promptPath = `./gpt_prompts/${prompt}.ts`;

  try {
    const fileInfo = await Deno.stat(promptPath);

    if (!fileInfo.isFile) {
      console.error(`✖ '${promptPath}' exists but is not a file.`);

      Deno.exit(1);
    }
  } catch {
    console.error(
      `✖ Prompt '${prompt}' not found in ./gpt_prompts. Make sure the file exists and has a .ts extension.`,
    );

    Deno.exit(1);
  }

  const command = new Deno.Command("deno", {
    args: ["run", "-A", promptPath, ...args],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });

  const { code } = await command.output();

  Deno.exit(code);
}
