/**
 * Shared logic for preparing and delivering a prompt to the clipboard and
 * browser.
 *
 * Can be used standalone via CLI or imported from other prompt scripts.
 *
 * Usage: `deno run -A ./gpt_prompts/prepare_prompt.ts "<prompt text>"`
 */

export async function copyToClipboard(text: string): Promise<void> {
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

export async function openChatGpt(): Promise<void> {
  const url = "https://chatgpt.com";
  const canOpen = Deno.build.os === "darwin" || Deno.build.os === "windows";

  if (canOpen) {
    const cmd = Deno.build.os === "windows" ? ["cmd", "/c", "start", url] : ["open", url];
    const p = new Deno.Command(cmd[0], { args: cmd.slice(1) });

    await p.output();

    console.log("🌐  Opened ChatGPT in your browser. Just paste and go!");
  } else {
    console.log(`🌐  Prompt is in your clipboard. Open ${url} and paste it manually.`);
  }
}

if (import.meta.main) {
  const text = Deno.args.join(" ").trim();

  if (!text) {
    console.error("Usage: deno run -A ./gpt_prompts/prepare_prompt.ts <prompt text>");

    Deno.exit(1);
  }

  await copyToClipboard(text);

  console.log("✔ Prompt copied to clipboard.");

  await openChatGpt();
}
