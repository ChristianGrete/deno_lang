import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isNull } from "./is_null.ts";

Deno.test("isNull() returns true for null", () => {
  assert(isNull(null));
});

Deno.test("isNull() returns false for non-null values", () => {
  assertFalse(isNull(undefined));
  assertFalse(isNull(0));
  assertFalse(isNull(""));
  assertFalse(isNull(false));
  assertFalse(isNull(NaN));
  assertFalse(isNull({}));
  assertFalse(isNull([]));
  assertFalse(isNull(() => {}));
  assertFalse(isNull(Symbol("null")));
});

Deno.test("isNull() acts as a type guard", () => {
  const maybeNull: unknown = null;

  if (isNull(maybeNull)) {
    const definitelyNull: null = maybeNull;

    assertStrictEquals(definitelyNull, null);
  }
});

Deno.test("isNull() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isNull(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isNull(null, undefined), TypeError);
});
