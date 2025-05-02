import { assert, assertFalse, assertThrows } from "@std/assert";

import { isComplex } from "./is_complex.ts";

Deno.test("isComplex() returns true for complex values", () => {
  assert(isComplex([]));
  assert(isComplex({}));
  assert(isComplex(() => {}));
  assert(isComplex(/regex/));
  assert(isComplex(new Date()));
  assert(isComplex(new Map()));
  assert(isComplex(new Set()));
  assert(isComplex(Promise.resolve()));
  assert(isComplex(new Number(42)));
  assert(isComplex(new String("foo")));
  assert(isComplex(new Boolean(true)));
});

Deno.test("isComplex() returns false for primitive values", () => {
  assertFalse(isComplex(undefined));
  assertFalse(isComplex(null));
  assertFalse(isComplex(false));
  assertFalse(isComplex(true));
  assertFalse(isComplex(0));
  assertFalse(isComplex(123n)); // bigint
  assertFalse(isComplex("hello"));
  assertFalse(isComplex(Symbol("sym")));
});

Deno.test("isComplex() throws on invalid number of arguments", () => {
  // @ts-expect-error – test intentional invalid usage
  assertThrows(() => isComplex(), TypeError);

  // @ts-expect-error – test too many arguments
  assertThrows(() => isComplex("foo", "bar"), TypeError);
});
