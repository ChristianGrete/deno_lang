/**
 * Rewraps comments in all `.ts` files under CWD to a max width of 80 characters.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 */

import { walk } from "@std/fs/walk";

const MAX_WIDTH = 80;

/**
 * Wraps plain text at a given width, keeping indentation and prefix.
 */
function wrapComment(text: string, prefix: string): string {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((prefix + current + " " + word).length > MAX_WIDTH) {
      lines.push(prefix + current.trimEnd());
      current = word + " ";
    } else {
      current += word + " ";
    }
  }

  if (current.trim()) {
    lines.push(prefix + current.trimEnd());
  }

  return lines.join("\n");
}

/**
 * Formats line and block comments within a file.
 */
function formatComments(code: string): string {
  return code.replace(
    /(^[ \t]*\/\/ ?(.*)$|\/(\*\*?|\*)([\s\S]*?)\*\/)/gm,
    (match, lineComment, lineText, blockStart, blockBody) => {
      if (lineComment !== undefined) {
        if (!lineText || !lineText.trim()) return match;
        const prefix = match.match(/^([ \t]*\/\/ ?)/)?.[1] ?? "// ";
        return wrapComment(lineText, prefix);
      } else if (blockStart !== undefined) {
        const lines = blockBody.split(/\r?\n/).map((line: string) => {
          const [, indent = "", text = ""] = line.match(/^([ \t]*\* ?)?(.*)$/) || [];
          return { indent, text };
        });

        const joined = lines.map((l: { text: string }) => l.text).join(" ");
        if (!joined.trim()) return match;

        const isJSDoc = blockStart === "**";
        const wrapped = wrapComment(joined, isJSDoc ? " * " : " * ");
        const indent = match.match(/^(\s*)\/(\*\*?|\*)/)?.[1] ?? "";

        return `${indent}/${blockStart}\n${wrapped}\n${indent} */`;
      }
      return match;
    },
  );
}

/**
 * Recursively finds and rewrites all .ts files in the current working directory.
 */
async function main() {
  for await (const entry of walk(".", { exts: [".ts"], includeDirs: false })) {
    const path = entry.path;
    const original = await Deno.readTextFile(path);
    const formatted = formatComments(original);

    if (formatted !== original) {
      await Deno.writeTextFile(path, formatted);
      console.log(`✔ formatted ${path}`);
    }
  }
}

if (import.meta.main) {
  main();
}
