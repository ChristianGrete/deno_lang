import tsParser from "@typescript-eslint/parser";
import type { ESLint, Linter } from "eslint";
import importPlugin from "eslint-plugin-import";
import jsdocPlugin from "eslint-plugin-jsdoc";
import jsoncPlugin from "eslint-plugin-jsonc";
import simpleImportSortPlugin from "eslint-plugin-simple-import-sort";
import sortKeysFixPlugin from "eslint-plugin-sort-keys-fix";
import unusedImportsPlugin from "eslint-plugin-unused-imports";
import jsoncParser from "jsonc-eslint-parser";

const config: Linter.Config[] = [{
  files: ["**/*.ts"],
  languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: "latest", sourceType: "module" } },
  plugins: {
    "import": importPlugin,
    "jsdoc": jsdocPlugin,
    "simple-import-sort": simpleImportSortPlugin,
    "sort-keys-fix": sortKeysFixPlugin,
    "unused-imports": unusedImportsPlugin,
  },
  rules: {
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-default-export": "error",
    "import/no-duplicates": "error",
    "import/no-named-default": "error",
    "import/no-useless-path-segments": "error",
    "jsdoc/check-alignment": "error",
    "jsdoc/check-indentation": "error",
    "jsdoc/check-syntax": "error",
    "jsdoc/check-tag-names": "error",
    "jsdoc/check-template-names": "error",
    "jsdoc/check-types": "error",
    "jsdoc/check-values": "error",
    "jsdoc/empty-tags": "error",
    "jsdoc/informative-docs": "error",
    "jsdoc/no-undefined-types": "error",
    "jsdoc/require-asterisk-prefix": "error",
    "jsdoc/require-hyphen-before-param-description": "error",
    "jsdoc/require-param-description": "error",
    "jsdoc/require-param-name": "error",
    "jsdoc/require-param-type": "error",
    "jsdoc/require-returns-check": "error",
    "jsdoc/require-returns-description": "error",
    "jsdoc/require-returns-type": "error",
    "jsdoc/require-template": "error",
    "jsdoc/require-throws": "error",
    "jsdoc/require-yields": "error",
    "jsdoc/require-yields-check": "error",
    "no-restricted-exports": ["error", { restrictedNamedExports: ["then"] }],
    "no-restricted-imports": ["error", { patterns: ["node:*"] }],
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": "error",
    "sort-keys-fix/sort-keys-fix": ["error", "asc", { natural: true }],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": ["error", {
      args: "after-used",
      argsIgnorePattern: "^_",
      ignoreRestSiblings: true,
      vars: "all",
    }],
  },
}, {
  files: ["**/*.json"],
  languageOptions: { parser: jsoncParser, parserOptions: { jsonSyntax: "JSON" } },
  plugins: { jsonc: jsoncPlugin as unknown as ESLint.Plugin },
  rules: {
    "jsonc/no-bigint-literals": "error",
    "jsonc/no-binary-expression": "error",
    "jsonc/no-binary-numeric-literals": "error",
    "jsonc/no-comments": "error",
    "jsonc/no-dupe-keys": "error",
    "jsonc/no-escape-sequence-in-identifier": "error",
    "jsonc/no-floating-decimal": "error",
    "jsonc/no-hexadecimal-numeric-literals": "error",
    "jsonc/no-infinity": "error",
    "jsonc/no-multi-str": "error",
    "jsonc/no-nan": "error",
    "jsonc/no-number-props": "error",
    "jsonc/no-numeric-separators": "error",
    "jsonc/no-octal": "error",
    "jsonc/no-octal-numeric-literals": "error",
    "jsonc/no-parenthesized": "error",
    "jsonc/no-plus-sign": "error",
    "jsonc/no-regexp-literals": "error",
    "jsonc/no-sparse-arrays": "error",
    "jsonc/no-template-literals": "error",
    "jsonc/no-undefined-value": "error",
    "jsonc/no-unicode-codepoint-escapes": "error",
    "jsonc/no-useless-escape": "error",
    "jsonc/sort-keys": "error",
    "jsonc/valid-json-number": "error",
  },
}];

// eslint-disable-next-line import/no-default-export
export default config;
