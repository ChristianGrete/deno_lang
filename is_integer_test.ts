import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";
import { isInteger } from "./is_integer.ts";

Deno.test("isInteger() returns true for primitive integer numbers", () => {
  assert(isInteger(0));
  assert(isInteger(1));
  assert(isInteger(-100));
  assert(isInteger(Number.MAX_SAFE_INTEGER));
});

Deno.test("isInteger() returns true for Number objects that are integers", () => {
  assert(isInteger(new Number(0)));
  assert(isInteger(new Number(-42)));
});

Deno.test("isInteger() returns false for non-integer numbers", () => {
  assertFalse(isInteger(0.1));
  assertFalse(isInteger(-1.5));
  assertFalse(isInteger(Math.PI));
});

Deno.test("isInteger() returns false for Number objects that are not integers", () => {
  assertFalse(isInteger(new Number(3.14)));
  assertFalse(isInteger(new Number(NaN)));
  assertFalse(isInteger(new Number(Infinity)));
});

Deno.test("isInteger() returns false for non-number values", () => {
  assertFalse(isInteger("42"));
  assertFalse(isInteger(null));
  assertFalse(isInteger(undefined));
  assertFalse(isInteger(true));
  assertFalse(isInteger([]));
  assertFalse(isInteger({}));
  assertFalse(isInteger(() => {}));
  assertFalse(isInteger(Symbol("1")));
});

Deno.test("isInteger() acts as a type guard", () => {
  const maybeInt: unknown = 123;

  if (isInteger(maybeInt)) {
    const definitelyInt: number = maybeInt;
    assertStrictEquals(typeof definitelyInt, "number");
  }
});

Deno.test("isInteger() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isInteger(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isInteger(1, 2), TypeError);
});
