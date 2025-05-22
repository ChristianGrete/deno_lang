import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isString } from "./is_string.ts";

Deno.test("isString() returns true for strings", () => {
  assert(isString(""));
  assert(isString("hello"));
  assert(isString(String("test")));
  assert(isString(new String("wrapped")));
});

Deno.test("isString() returns false for non-string values", () => {
  assertFalse(isString(123));
  assertFalse(isString(NaN));
  assertFalse(isString(true));
  assertFalse(isString(null));
  assertFalse(isString(undefined));
  assertFalse(isString([]));
  assertFalse(isString({}));
  assertFalse(isString(() => {}));
  assertFalse(isString(Symbol("str")));
});

Deno.test("isString() acts as a type guard", () => {
  const maybeStr: unknown = "typed";

  if (isString(maybeStr)) {
    const definitelyStr: string = maybeStr;
    assertStrictEquals(typeof definitelyStr, "string");
  }
});

Deno.test("isString() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isString(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isString("a", "b"), TypeError);
});
