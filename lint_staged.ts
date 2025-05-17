import { type Configuration } from "npm:lint-staged";

const config: Configuration = {
  "*.ts": ["deno check", "deno lint --fix", "deno task fmt"],
  "*.{json,md,yml}": "deno task fmt",
};

// eslint-disable-next-line import/no-default-export
export default config;
