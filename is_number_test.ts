import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isNumber } from "./is_number.ts";

Deno.test("isNumber() returns true for numbers", () => {
  assert(isNumber(0));
  assert(isNumber(1));
  assert(isNumber(-42));
  assert(isNumber(Math.PI));
  assert(isNumber(NaN));
  assert(isNumber(Infinity));
  assert(isNumber(-Infinity));
  assert(isNumber(new Number(123)));
});

Deno.test("isNumber() returns false for non-number values", () => {
  assertFalse(isNumber("123"));
  assertFalse(isNumber("NaN"));
  assertFalse(isNumber(null));
  assertFalse(isNumber(undefined));
  assertFalse(isNumber(true));
  assertFalse(isNumber([]));
  assertFalse(isNumber({}));
  assertFalse(isNumber(() => {}));
  assertFalse(isNumber(Symbol("123")));
});

Deno.test("isNumber() acts as a type guard", () => {
  const maybeNum: unknown = 123;

  if (isNumber(maybeNum)) {
    const definitelyNum: number = maybeNum;

    assertStrictEquals(typeof definitelyNum, "number");
  }
});

Deno.test("isNumber() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isNumber(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isNumber(1, 2), TypeError);
});
