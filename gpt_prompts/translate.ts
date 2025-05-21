/**
 * CLI tool to generate a ChatGPT-ready prompt for translating text.
 *
 * Usage: `deno run -A ./gpt_prompts/translate.ts <text>`
 */

import { bold, dim, green, italic, red } from "@std/fmt/colors";

import { copyToClipboard, openChatGpt } from "./general.ts";

const INSTRUCTION = `Translate the text above into casual, modern, yet professional US English.

The content is intended for a Deno-based TypeScript project. Make descriptions short, clear, and easy to understand.

Output only the translated text in a Markdown code block - with no explanations or extra text.`;

const usage = (code: number): never => {
  console.info(`${green("Usage:")} deno run -A ./gpt_prompts/translate.ts ${italic("<text>")}`);

  Deno.exit(code);
};

const isHelpFlag = (arg: string): boolean => ["-h", "--help", "help"].includes(arg.toLowerCase());

if (import.meta.main) {
  const text = Deno.args.join(" ").trim();

  if (!text) usage(1);

  if (isHelpFlag(text)) usage(0);

  const prompt = `\`\`\`\n${text}\n\`\`\`\n\n${INSTRUCTION}`;

  try {
    await copyToClipboard(prompt);

    console.log(`${green("Success")} Copied ChatGPT translation prompt to clipboard.`);

    await openChatGpt();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`${bold(red("Error"))} ${dim("Failed to run prompt 'translate':")}`);
      console.error(red(err.message));
    } else {
      console.error(`${bold(red("Error"))} ${red("An unknown error occurred.")}`);
    }
  }
}
