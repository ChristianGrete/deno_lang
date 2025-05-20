import { extname, relative, SEPARATOR } from "@std/path";

const snakeCase = /^[a-z0-9]+(?:_[a-z0-9]+)*$/;
const upperSnakeCase = /^[A-Z0-9]+(?:_[A-Z0-9]+)*$/;

const isValidSegment = (segment: string, ext: string): boolean => {
  const name = segment.replace(ext, "");

  if (ext === ".md" || ext === "") return snakeCase.test(name) || upperSnakeCase.test(name);

  return snakeCase.test(name);
};

if (import.meta.main) {
  const args = Deno.args;
  const isCatchAll = args.length === 0 ||
    args.some((arg) => [".", "./", "./*", "./**/*", "", "**", "**/*"].includes(arg));

  if (isCatchAll) {
    console.error("🚫 Catch-all patterns like '.' or '**/*' are not allowed.");
    console.error("👉 Please provide explicit file paths to check.");

    Deno.exit(1);
  }

  const invalid: string[] = [];

  for (const rawPath of args) {
    try {
      const fileInfo = await Deno.stat(rawPath);

      if (!fileInfo.isFile) continue;

      const path = relative(".", rawPath);
      const parts = path.split(SEPARATOR);

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const ext = i === parts.length - 1 ? extname(part) : "";

        if (!isValidSegment(part, ext)) {
          invalid.push(path);

          break;
        }
      }
    } catch {
      // Non-existent path - ignore silently
    }
  }

  if (invalid.length > 0) {
    console.error("✖ Invalid filenames:");

    for (const path of invalid) {
      console.error(" -", path);
    }

    console.error(
      "\nOnly snake_case is allowed in paths and filenames, except for .md and extensionless files, which may use UPPER_SNAKE_CASE.",
    );

    Deno.exit(1);
  }
}
