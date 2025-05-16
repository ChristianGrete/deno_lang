/**
 * CLI tool to generate a ChatGPT-ready prompt for translating text.
 *
 * Usage: `deno run -A ./_gpt_prompts/translate.ts <text>`
 */

import { copyToClipboard, openChatGpt } from "./general.ts";

const INSTRUCTION = `Translate the text above into casual, modern, yet professional US English.

The content is intended for a Deno-based TypeScript project. Make descriptions short, clear, and easy to understand.

Output only the translated text in a Markdown code block - with no explanations or extra text.`;

function usage(code: number): never {
  console.error("Usage: deno run -A ./_gpt_prompts/translate.ts <text>");

  Deno.exit(code);
}

function isHelpFlag(arg: string): boolean {
  return ["-h", "--help", "help"].includes(arg.toLowerCase());
}

if (import.meta.main) {
  const args = Deno.args;
  const text = args.join(" ").trim();

  if (!text) usage(1);

  if (args.some(isHelpFlag)) usage(0);

  const prompt = `\`\`\`\n${text}\n\`\`\`\n\n${INSTRUCTION}`;

  await copyToClipboard(prompt);

  console.log("✔ Copied ChatGPT translation prompt to clipboard.");

  await openChatGpt();
}
