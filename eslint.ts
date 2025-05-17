import tsParser from "npm:@typescript-eslint/parser";
import type { ESLint, Linter } from "npm:eslint";
import * as importPluginNs from "npm:eslint-plugin-import";
import jsoncPlugin from "npm:eslint-plugin-jsonc";
import simpleImportSortPlugin from "npm:eslint-plugin-simple-import-sort";
import jsoncParser from "npm:jsonc-eslint-parser";

// Workaround for CommonJS export: use `default` if present (CJS interop)
const importPlugin = importPluginNs.default ?? importPluginNs;

const config: Linter.Config[] = [{
  files: ["**/*.ts"],
  languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: "latest", sourceType: "module" } },
  plugins: { "import": importPlugin, "simple-import-sort": simpleImportSortPlugin },
  rules: {
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-default-export": "error",
    "import/no-duplicates": "error",
    "import/no-named-default": "error",
    "import/no-useless-path-segments": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
}, {
  files: ["**/*.json"],
  languageOptions: { parser: jsoncParser },
  plugins: { jsonc: jsoncPlugin as unknown as ESLint.Plugin },
  rules: { "jsonc/sort-keys": "error" },
}];

// eslint-disable-next-line import/no-default-export
export default config;
