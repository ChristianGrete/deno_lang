import { assertStrictEquals, assertThrows } from "@std/assert";

import { toInteger } from "./to_integer.ts";

Deno.test("toInteger() converts strings and numbers into floored integers", () => {
  assertStrictEquals(toInteger(42), 42);
  assertStrictEquals(toInteger(3.9), 3);
  assertStrictEquals(toInteger(-1.1), -2);
  assertStrictEquals(toInteger("10.99"), 10);
  assertStrictEquals(toInteger("0.0001"), 0);
  assertStrictEquals(toInteger("8e5"), 800000);
});

Deno.test("toInteger() supports strict parsing for strings", () => {
  assertStrictEquals(toInteger("123", { strict: true }), 123);
  assertStrictEquals(toInteger("3.14", { strict: true }), 3);
  assertStrictEquals(toInteger("123abc", { strict: true }), NaN);
  assertStrictEquals(toInteger("abc123", { strict: true }), NaN);
  assertStrictEquals(toInteger("1.2.3", { strict: true }), NaN);
});

Deno.test("toInteger() returns 0 for nullish, false, or empty input", () => {
  assertStrictEquals(toInteger(null), 0);
  assertStrictEquals(toInteger(undefined), 0);
  assertStrictEquals(toInteger(false), 0);
  assertStrictEquals(toInteger(""), 0);
  assertStrictEquals(toInteger("   "), 0);
});

Deno.test("toInteger() returns NaN for non-numeric values", () => {
  assertStrictEquals(toInteger([4]), NaN);
  assertStrictEquals(toInteger({}), NaN);
  assertStrictEquals(toInteger(Symbol("x")), NaN);
  assertStrictEquals(toInteger(4n), NaN);
});

Deno.test("toInteger() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => toInteger(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => toInteger("123", false, true), TypeError);
});
