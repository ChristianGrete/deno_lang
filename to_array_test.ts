import { assertEquals, assertStrictEquals, assertThrows } from "@std/assert";

import { toArray } from "./to_array.ts";

function getArguments(_x: string, _y: string): ArrayLike<string> {
  return arguments;
}

Deno.test("toArray() returns a shallow copy for arrays", () => {
  const original = [1, 2, 3];
  const result = toArray(original);

  assertEquals(result, [1, 2, 3]);

  // ensure it is a copy
  result[0] = 999;

  assertEquals(original[0], 1);
});

Deno.test("toArray() wraps primitives and non-array-like values in an array", () => {
  const sym = Symbol("x");
  const fn = () => {};

  assertEquals(toArray("hi"), ["h", "i"]);
  assertEquals(toArray(42), [42]);
  assertEquals(toArray(true), [true]);
  assertEquals(toArray(sym), [sym]);
  assertEquals(toArray(fn), [fn]);
});

Deno.test("toArray() returns an empty array for nullish values", () => {
  assertEquals(toArray(null), []);
  assertEquals(toArray(undefined), []);
});

Deno.test("toArray() converts array-like objects to arrays", () => {
  assertEquals(toArray({ 0: "a", 1: "b", length: 2 }), ["a", "b"]);
  assertEquals(toArray(getArguments("x", "y")), ["x", "y"]);
});

Deno.test("toArray() falls back to wrapping when slicing fails", () => {
  const evil = {
    get 0() {
      throw new Error("fail in slice");
    },
    length: 1,
  };

  const result = toArray(evil);

  assertEquals(result.length, 1);
  assertStrictEquals(result[0], evil);
});

Deno.test("toArray() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => toArray(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => toArray("a", "b"), TypeError);
});
