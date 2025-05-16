/**
 * CLI tool to generate a ChatGPT-ready prompt for reformatting JSDoc comments.
 *
 * Usage: `deno run -A ./gpt_prompts/fmt_comments.ts <filename>`
 */

import { basename } from "jsr:@std/path";
import { copyToClipboard, openChatGpt } from "./general.ts";

const INSTRUCTION = `Reformat only JSDoc-style comments (/** ... */) in the provided TypeScript file.

Do not change or format any other comments (e.g. // or /* ... */).
Do not modify any TypeScript code. Do not change indentation, spacing, or rewrap code lines at all — even if they exceed 80 characters.

Reflow all lines within JSDoc blocks that exceed exactly 80 characters — including the first summary line after /**. Treat all lines equally, even if they appear to be a one-line summary.

Do not reflow lines that are already 80 characters or fewer.

Preserve all original indentation, comment prefixes (e.g. *), JSDoc tags, Markdown formatting, and inline elements such as links (@link, {@link ...}, {@example ...}).

Output only the updated TypeScript code block — no explanations, no extra text.`;

function usage(): never {
  console.error("Usage: deno run -A ./gpt_prompts/fmt_comments.ts <filename>");

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
