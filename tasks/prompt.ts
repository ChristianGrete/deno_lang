/**
 * Generic task proxy to call a GPT prompt tool.
 *
 * Usage: `deno task prompt <prompt> <args...>`
 */

function usage(code: number): never {
  console.error("Usage: deno task prompt <prompt> <args...>");

  Deno.exit(code);
}

function isHelpFlag(arg: string): boolean {
  return ["-h", "--help", "help"].includes(arg.toLowerCase());
}

if (import.meta.main) {
  const [prompt, ...args] = Deno.args;

  if (!prompt) usage(1);

  if (isHelpFlag(prompt)) usage(0);

  const promptPath = `./gpt_prompts/${prompt}.ts`;

  try {
    const fileInfo = await Deno.stat(promptPath);

    if (!fileInfo.isFile) {
      console.error(`✖ '${promptPath}' exists but is not a file.`);

      Deno.exit(1);
    }
  } catch {
    console.error(`✖ '${promptPath}' not found. Make sure the prompt file exists.`);

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
