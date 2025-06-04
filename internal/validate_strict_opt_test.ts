import { assertEquals } from "@std/assert";

import { validateStrictOpt } from "./validate_strict_opt.ts";

Deno.test("validateStrictOpt() returns true for boolean true", () => {
  assertEquals(validateStrictOpt(true), true);
});

Deno.test("validateStrictOpt() returns false for boolean false", () => {
  assertEquals(validateStrictOpt(false), false);
});

Deno.test("validateStrictOpt() returns false for non-boolean values", () => {
  const invalidValues = [undefined, null, 0, 1, "true", "false", {}, [], Symbol("x"), () => {}];

  for (const val of invalidValues) {
    assertEquals(validateStrictOpt(val), false);
  }
});
