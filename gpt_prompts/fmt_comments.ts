/**
 * CLI tool to generate a ChatGPT-ready prompt for reformatting JSDoc comments.
 *
 * Usage: `deno run -A ./gpt_prompts/fmt_comments.ts <filename>`
 */

import { basename } from "jsr:@std/path";

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

async function copyToClipboard(text: string): Promise<void> {
  const os = Deno.build.os;
  const encoder = new TextEncoder();
  const input = encoder.encode(text);

  if (os === "darwin") {
    const cmd = new Deno.Command("pbcopy", { stdin: "piped" });
    const proc = cmd.spawn();
    const writer = proc.stdin.getWriter();
    await writer.write(input);
    await writer.close();
    await proc.status;
  } else if (os === "linux") {
    const cmd = new Deno.Command("xclip", { args: ["-selection", "clipboard"], stdin: "piped" });
    const proc = cmd.spawn();
    const writer = proc.stdin.getWriter();
    await writer.write(input);
    await writer.close();
    await proc.status;
  } else if (os === "windows") {
    const cmd = new Deno.Command("clip", { stdin: "piped" });
    const proc = cmd.spawn();
    const writer = proc.stdin.getWriter();
    await writer.write(input);
    await writer.close();
    await proc.status;
  } else {
    throw new Error("Unsupported OS for clipboard copy");
  }
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

    const url = "https://chat.openai.com/?model=gpt-4-turbo";
    const canOpen = Deno.build.os === "darwin" || Deno.build.os === "windows";
    if (canOpen) {
      const cmd = Deno.build.os === "windows" ? ["cmd", "/c", "start", url] : ["open", url];
      const p = new Deno.Command(cmd[0], { args: cmd.slice(1) });
      await p.output();
      console.log("🌐 Opened ChatGPT in your browser. Just paste and go!");
    } else {
      console.log("🌐 Prompt is in your clipboard. Open https://chat.openai.com and paste it manually.");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌  Error:", err.message);
    } else {
      console.error("❌  Unknown error:", err);
    }
    Deno.exit(1);
  }
}
