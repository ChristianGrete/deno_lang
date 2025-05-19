import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*.{md,yml}": "deno task dprint-fmt",
  "*.json": ["deno task eslint-fix", "deno task dprint-fmt"],
  "*.ts": ["deno lint --fix", "deno task eslint-fix", "deno task dprint-fmt"],
};

// eslint-disable-next-line import/no-default-export
export default config;
