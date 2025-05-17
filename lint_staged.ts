import { type Configuration } from "npm:lint-staged";

const config: Configuration = {
  "*.ts": ["deno check", "deno lint --fix", "deno task fmt"],
  "*.{json,md,yml}": "deno task fmt",
};

export default config;
