import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isNumeric, type Numeric } from "./is_numeric.ts";

Deno.test("isNumeric() returns true for numeric numbers", () => {
  assert(isNumeric(0));
  assert(isNumeric(42));
  assert(isNumeric(-123.456));
  assert(isNumeric(8e5));
  assert(isNumeric(1.5999999999999999));
  assert(isNumeric(0xFFF));
});

Deno.test("isNumeric() returns true for numeric strings", () => {
  assert(isNumeric("3.14"));
  assert(isNumeric("0xFF"));
  assert(isNumeric("0Xba"));
  assert(isNumeric("8e5"));
  assert(isNumeric("123e-2"));
  assert(isNumeric("040"));
  assert(isNumeric("0b111"));
  assert(isNumeric("0o76"));
});

Deno.test("isNumeric() returns false for non-numeric strings", () => {
  assertFalse(isNumeric("foo"));
  assertFalse(isNumeric("NaN"));
  assertFalse(isNumeric("Infinity"));
  assertFalse(isNumeric(""));
  assertFalse(isNumeric("   ")); // whitespace only
  assertFalse(isNumeric(" 42 ")); // whitespace-padded numeric string
  assertFalse(isNumeric("abcdefghijklm1234567890"));
  assertFalse(isNumeric("7.2acdgs"));
  assertFalse(isNumeric("\t\t")); // tab-only
  assertFalse(isNumeric("\n\n")); // newline-only
});

Deno.test("isNumeric() returns false for NaN and Infinity", () => {
  assertFalse(isNumeric(NaN));
  assertFalse(isNumeric(Infinity));
  assertFalse(isNumeric(-Infinity));
});

Deno.test("isNumeric() returns false for non-numeric values", () => {
  assertFalse(isNumeric(null));
  assertFalse(isNumeric(undefined));
  assertFalse(isNumeric(true));
  assertFalse(isNumeric(false));
  assertFalse(isNumeric([]));
  assertFalse(isNumeric([42]));
  assertFalse(isNumeric({}));
  assertFalse(isNumeric({ toString: () => "42" }));
  assertFalse(isNumeric(() => {}));
  assertFalse(isNumeric(Symbol("1")));
  assertFalse(isNumeric(new Date()));
});

Deno.test("isNumeric() acts as a type guard", () => {
  const maybeNum: unknown = "42";

  if (isNumeric(maybeNum)) {
    const definitelyNum: Numeric = maybeNum;

    assertStrictEquals(typeof definitelyNum === "number" || typeof definitelyNum === "string", true);
  }
});

Deno.test("isNumeric() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isNumeric(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isNumeric(1, 2), TypeError);
});
