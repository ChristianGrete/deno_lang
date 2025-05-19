/**
 * Shortcut to call the GPT translate prompt tool.
 *
 * Usage: `deno task translate <text>`
 */

const promptPath = "./gpt_prompts/translate.ts";

if (import.meta.main) {
  const args = Deno.args;

  const command = new Deno.Command("deno", {
    args: ["run", "-A", promptPath, ...args],
    stderr: "inherit",
    stdin: "inherit",
    stdout: "inherit",
  });

  const { code } = await command.output();

  Deno.exit(code);
}
