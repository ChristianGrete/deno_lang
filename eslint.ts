import tsParser from "npm:@typescript-eslint/parser";
import type { Linter } from "npm:eslint";

const config: Linter.Config[] = [{
  files: ["**/*.ts"],
  languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: "latest", sourceType: "module" } },
  rules: {}, // Keine Regeln = keine Eingriffe
}];

export default config;
