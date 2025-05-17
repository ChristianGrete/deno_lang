import { assert, assertFalse, assertStrictEquals, assertThrows } from "jsr:@std/assert";

import { isFinite } from "./is_finite.ts";

Deno.test("isFinite() returns true for finite numbers", () => {
  assert(isFinite(0));
  assert(isFinite(42));
  assert(isFinite(-123.456));
});

Deno.test("isFinite() returns false for non-finite numbers", () => {
  assertFalse(isFinite(NaN));
  assertFalse(isFinite(Infinity));
  assertFalse(isFinite(-Infinity));
});

Deno.test("isFinite() returns false for non-number values", () => {
  assertFalse(isFinite("42"));
  assertFalse(isFinite(null));
  assertFalse(isFinite(undefined));
  assertFalse(isFinite(true));
  assertFalse(isFinite([]));
  assertFalse(isFinite({}));
  assertFalse(isFinite(() => {}));
  assertFalse(isFinite(Symbol("42")));
});

Deno.test("isFinite() acts as a type guard", () => {
  const maybeNumber: unknown = 3.14;

  if (isFinite(maybeNumber)) {
    const definitelyNumber: number = maybeNumber;
    assertStrictEquals(typeof definitelyNumber, "number");
  }
});

Deno.test("isFinite() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isFinite(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isFinite(1, 2), TypeError);
});
