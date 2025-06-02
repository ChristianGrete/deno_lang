import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isFloat } from "./is_float.ts";

Deno.test("isFloat() returns true for primitive floats", () => {
  assert(isFloat(0.1));
  assert(isFloat(-3.14));
  assert(isFloat(Math.PI));
  assert(isFloat(1.0000000001));
});

Deno.test("isFloat() returns true for Number objects that are floats", () => {
  assert(isFloat(new Number(2.71)));
  assert(isFloat(new Number(-0.25)));
});

Deno.test("isFloat() returns false for integers", () => {
  assertFalse(isFloat(0));
  assertFalse(isFloat(1));
  assertFalse(isFloat(-42));
  assertFalse(isFloat(Number.MAX_SAFE_INTEGER));
});

Deno.test("isFloat() returns false for Number objects that are integers", () => {
  assertFalse(isFloat(new Number(0)));
  assertFalse(isFloat(new Number(123)));
});

Deno.test("isFloat() returns false for non-finite numbers", () => {
  assertFalse(isFloat(NaN));
  assertFalse(isFloat(Infinity));
  assertFalse(isFloat(-Infinity));
  assertFalse(isFloat(new Number(NaN)));
  assertFalse(isFloat(new Number(Infinity)));
});

Deno.test("isFloat() returns false for non-number values", () => {
  assertFalse(isFloat("3.14"));
  assertFalse(isFloat(null));
  assertFalse(isFloat(undefined));
  assertFalse(isFloat(true));
  assertFalse(isFloat([]));
  assertFalse(isFloat({}));
  assertFalse(isFloat(() => {}));
  assertFalse(isFloat(Symbol("3.14")));
});

Deno.test("isFloat() acts as a type guard", () => {
  const maybeFloat: unknown = 3.1415;

  if (isFloat(maybeFloat)) {
    const definitelyFloat: number = maybeFloat;

    assertStrictEquals(typeof definitelyFloat, "number");
  }
});

Deno.test("isFloat() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => isFloat(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isFloat(3.14, 1), TypeError);
});
