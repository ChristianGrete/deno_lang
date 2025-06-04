import { assertThrows } from "@std/assert";

import { validatePlainObjArg } from "./validate_plain_obj_arg.ts";

Deno.test("validatePlainObjArg() passes for plain objects", () => {
  validatePlainObjArg("arg", {}); // plain literal
  validatePlainObjArg("arg", { foo: "bar" });
  validatePlainObjArg("arg", Object.create(null)); // pure dictionary
});

Deno.test("validatePlainObjArg() throws for non-plain objects", () => {
  const invalidValues = [
    null,
    undefined,
    [],
    new Date(),
    new Map(),
    new Set(),
    new (class {})(),
    () => {},
    123,
    "string",
    Symbol("x"),
    true,
  ];

  for (const val of invalidValues) {
    assertThrows(() => validatePlainObjArg("arg", val), TypeError, `Invalid argument 'arg': expected string, got`);
  }
});
