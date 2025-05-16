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
  const [tool, ...args] = Deno.args;
  if (!tool) usage();

  const toolPath = `./_gpt_prompts/${tool}.ts`;

  try {
    const fileInfo = await Deno.stat(toolPath);
    if (!fileInfo.isFile) {
      console.error(`❌  '${toolPath}' exists but is not a file.`);
      Deno.exit(1);
    }
  } catch {
    console.error(
      `❌  Prompt '${tool}' not found in ./_gpt_prompts. Make sure the file exists and has a .ts extension.`,
    );
    Deno.exit(1);
  }

  const command = new Deno.Command("deno", {
    args: ["run", "-A", toolPath, ...args],
    stdin: "inherit",
    stdout: "inherit",
    stderr: "inherit",
  });

  const { code } = await command.output();
  Deno.exit(code);
}
