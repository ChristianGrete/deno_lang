import { assertThrows } from "@std/assert";

import { validateArgsLength } from "./validate_args_length.ts";

Deno.test("validateArgsLength() passes when argument length matches", () => {
  validateArgsLength([1]); // default expected = 1
  validateArgsLength([1, 2], 2);
});

Deno.test("validateArgsLength() throws when argument length is too low", () => {
  assertThrows(() => validateArgsLength([], 1), TypeError, "expected 1, got 0");
});

Deno.test("validateArgsLength() throws when argument length is too high", () => {
  assertThrows(() => validateArgsLength([1, 2, 3], 2), TypeError, "expected 2, got 3");
});
