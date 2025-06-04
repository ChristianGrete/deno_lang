import { assertStrictEquals, assertThrows } from "@std/assert";

import { toNumber } from "./to_number.ts";

Deno.test("toNumber() returns the same value for number inputs", () => {
  assertStrictEquals(toNumber(0), 0);
  assertStrictEquals(toNumber(42), 42);
  assertStrictEquals(toNumber(-3.14), -3.14);
  assertStrictEquals(toNumber(Number.MAX_VALUE), Number.MAX_VALUE);
});

Deno.test("toNumber() returns 0 for nullish, false, and empty string values", () => {
  assertStrictEquals(toNumber(null), 0);
  assertStrictEquals(toNumber(undefined), 0);
  assertStrictEquals(toNumber(false), 0);
  assertStrictEquals(toNumber(""), 0);
  assertStrictEquals(toNumber("   "), 0);
});

Deno.test("toNumber() returns 1 for `true` (fast-path)", () => {
  assertStrictEquals(toNumber(true), 1);
});

Deno.test("toNumber() parses strings using parseFloat by default", () => {
  assertStrictEquals(toNumber("123"), 123);
  assertStrictEquals(toNumber("3.14"), 3.14);
  assertStrictEquals(toNumber("-0.5"), -0.5);
  assertStrictEquals(toNumber("8e5"), 800000);
  assertStrictEquals(toNumber("123abc"), 123); // parseFloat behavior
  assertStrictEquals(toNumber("not a number"), NaN);
  assertStrictEquals(toNumber("   42  "), 42); // still OK (trimmed)
});

Deno.test("toNumber() uses strict parsing when `options.strict` is true", () => {
  assertStrictEquals(toNumber("123", { strict: true }), 123);
  assertStrictEquals(toNumber("3.14", { strict: true }), 3.14);
  assertStrictEquals(toNumber("8e5", { strict: true }), 800000);
  assertStrictEquals(toNumber("123abc", { strict: true }), NaN);
  assertStrictEquals(toNumber("abc123", { strict: true }), NaN);
  assertStrictEquals(toNumber("1.2.3", { strict: true }), NaN);
  assertStrictEquals(toNumber("   42  ", { strict: true }), NaN); // strict disallows whitespace-padded numbers
});

Deno.test("toNumber() returns NaN for arrays and unsupported types", () => {
  assertStrictEquals(toNumber([]), NaN);
  assertStrictEquals(toNumber([1]), NaN);
  assertStrictEquals(toNumber(["123"]), NaN);
  assertStrictEquals(toNumber(Symbol("1")), NaN);
  assertStrictEquals(toNumber(4n), NaN);
});

Deno.test("toNumber() falls back to Number(...) for objects", () => {
  assertStrictEquals(toNumber({}), NaN);
  assertStrictEquals(toNumber({ valueOf: () => 7 }), 7);
  assertStrictEquals(toNumber({ toString: () => "8" }), 8);
});

Deno.test("toNumber() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => toNumber(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => toNumber("123", true, false), TypeError);
});
