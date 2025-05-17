import { assertThrows } from "jsr:@std/assert";

import { validateStringArg } from "./validate_string_arg.ts";

Deno.test("validateStringArg() passes for strings", () => {
  validateStringArg("testArg", "foo");
  validateStringArg("anotherArg", new String("bar")); // boxed string
});

Deno.test("validateStringArg() throws for non-strings", () => {
  const invalidValues = [42, null, undefined, {}, [], true, Symbol("x"), () => {}];

  for (const val of invalidValues) {
    assertThrows(() => validateStringArg("arg", val), TypeError, `Invalid argument 'arg': expected string, got`);
  }
});
