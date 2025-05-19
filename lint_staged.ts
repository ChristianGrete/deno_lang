import type { Configuration } from "lint-staged";

const config: Configuration = {
  "*.{json,md,yml}": "deno task fmt",
  "*.ts": ["deno check", "deno lint --fix", "deno task fmt"],
};

// eslint-disable-next-line import/no-default-export
export default config;
