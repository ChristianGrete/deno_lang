import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isNaN } from "./is_nan.ts";

Deno.test("isNaN() returns true for NaN", () => {
  assert(isNaN(NaN));
  assert(isNaN(new Number(NaN)));
  assert(isNaN(Object(NaN)));
});

Deno.test("isNaN() returns false for non-NaN numbers", () => {
  assertFalse(isNaN(0));
  assertFalse(isNaN(-1));
  assertFalse(isNaN(42.42));
  assertFalse(isNaN(Infinity));
  assertFalse(isNaN(-Infinity));
  assertFalse(isNaN(new Number(1)));
  assertFalse(isNaN(Object(1)));
});

Deno.test("isNaN() returns false for numeric strings and coercibles", () => {
  assertFalse(isNaN("NaN"));
  assertFalse(isNaN("42"));
  assertFalse(isNaN("0"));
  assertFalse(isNaN(""));
  assertFalse(isNaN("  "));
});

Deno.test("isNaN() returns false for non-number values", () => {
  assertFalse(isNaN(null));
  assertFalse(isNaN(undefined));
  assertFalse(isNaN(true));
  assertFalse(isNaN(false));
  assertFalse(isNaN([]));
  assertFalse(isNaN({}));
  assertFalse(isNaN(() => {}));
  assertFalse(isNaN(Symbol("NaN")));
});

Deno.test("isNaN() acts as a type guard", () => {
  const maybeNum: unknown = NaN;

  if (isNaN(maybeNum)) {
    const definitelyNum: number = maybeNum;

    assertStrictEquals(typeof definitelyNum, "number");
  }
});

Deno.test("isNaN() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isNaN(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isNaN(NaN, 42), TypeError);
});
