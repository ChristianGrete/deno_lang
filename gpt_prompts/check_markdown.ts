/**
 * CLI tool to generate a ChatGPT-ready prompt for proofreading Markdown files.
 *
 * Usage: `deno run -A ./gpt_prompts/check_markdown.ts <filename>`
 */

import { basename } from "jsr:@std/path";
import { copyToClipboard, openChatGpt } from "./general.ts";

const INSTRUCTION =
  `Please proofread the Markdown file above. Check for grammatical, spelling, content-related, and stylistic issues.

The goal is a casual, modern tone that still feels professional. Descriptions should be short, clear, and easy to understand.

Provide a list of corrections and suggestions for improvement. Do not rewrite the full text. Instead, point out specific issues with references to the relevant lines or phrases.

If there are any factual inaccuracies, note them as well.`;

function usage(): never {
  console.error("Usage: deno run -A ./gpt_prompts/check_markdown.ts <filename>");

  Deno.exit(1);
}

if (import.meta.main) {
  const file = Deno.args.join(" ").trim();

  if (!file || !file.endsWith(".md")) {
    console.error("✖ Please provide a valid .md file.");

    usage();
  }

  const path = new URL(file, `file://${Deno.cwd()}/`).pathname;

  try {
    const content = await Deno.readTextFile(path);
    const prompt = `\u0060\u0060\u0060md\n${content}\n\u0060\u0060\u0060\n\n${INSTRUCTION}`;

    await copyToClipboard(prompt);

    console.log(`✔ Copied ChatGPT prompt for '${basename(file)}' to clipboard.`);

    await openChatGpt();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("✖ Error:", err.message);
    } else {
      console.error("✖ Unknown error:", err);
    }

    Deno.exit(1);
  }
}
