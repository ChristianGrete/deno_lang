import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*": "deno task check-filenames",
  "*.{md,yml}": "deno task dprint-fmt",
  "*.json": ["deno task eslint-fix", "deno task dprint-fmt"],
  "*.ts": ["deno check", "deno lint --fix", "deno task eslint-fix", "deno task dprint-fmt", "deno task test"],
};

// eslint-disable-next-line import/no-default-export
export default config;
