/**
 * CLI tool to generate a ChatGPT-ready prompt for reformatting JSDoc comments.
 *
 * Usage: `deno run -A ./_gpt_prompts/fmt_comments.ts <filename>`
 */

import { basename } from "jsr:@std/path";
import { copyToClipboard, openChatGpt } from "./general.ts";

const INSTRUCTION =
  `Reformat JSDoc-style comments in this TypeScript file so that no comment line exceeds 80 characters.

Do not change or format any code. Do not rewrap, re-indent, or modify any code lines at all - even if they exceed 80 characters.

Only reflow JSDoc (/** ... */) comments. Break long lines of prose or descriptions, including summary lines, where appropriate.

Preserve the original indentation, comment prefixes, and any inline formatting such as Markdown, links, and JSDoc tags.

Do not wrap or split links, URLs, Markdown, or inline tags like @link, @see, {@link ...}, {@example ...}, etc.

Output only the updated TypeScript code - with no explanations or extra text.`;

function usage(): never {
  console.error("Usage: deno run -A ./_gpt_prompts/fmt_comments.ts <filename>");

  Deno.exit(1);
}

if (import.meta.main) {
  const [file] = Deno.args;

  if (!file) usage();

  const path = new URL(file, `file://${Deno.cwd()}/`).pathname;

  try {
    const content = await Deno.readTextFile(path);
    const prompt = `\u0060\u0060\u0060ts\n${content}\n\u0060\u0060\u0060\n\n${INSTRUCTION}`;

    await copyToClipboard(prompt);

    console.log(`✔ Copied ChatGPT prompt for '${basename(file)}' to clipboard.`);

    await openChatGpt();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌  Error:", err.message);
    } else {
      console.error("❌  Unknown error:", err);
    }

    Deno.exit(1);
  }
}
