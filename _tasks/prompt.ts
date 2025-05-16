/**
 * Generic task proxy to call a GPT prompt tool.
 *
 * Usage: `deno task prompt <tool> <args...>`
 */

function usage(): never {
  console.error("Usage: deno task prompt <tool> <args...>");

  Deno.exit(1);
}

if (import.meta.main) {
  const [prompt, ...args] = Deno.args;

  if (!prompt) usage();

  const promptPath = `./_gpt_prompts/${prompt}.ts`;

  try {
    const fileInfo = await Deno.stat(promptPath);

    if (!fileInfo.isFile) {
      console.error(`✖ '${promptPath}' exists but is not a file.`);

      Deno.exit(1);
    }
  } catch {
    console.error(
      `✖ Prompt '${prompt}' not found in ./_gpt_prompts. Make sure the file exists and has a .ts extension.`,
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
