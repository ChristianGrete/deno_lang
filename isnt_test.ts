import { assert, assertFalse, assertThrows } from "@std/assert";

import { isnt } from "./isnt.ts";

Deno.test("isnt() returns false for strictly identical values", () => {
  assertFalse(isnt(42, 42));
  assertFalse(isnt("foo", "foo"));
  assertFalse(isnt(null, null));
  assertFalse(isnt(undefined, undefined));
  const sym = Symbol("x");
  assertFalse(isnt(sym, sym));
});

Deno.test("isnt() distinguishes 0 and -0", () => {
  assert(isnt(0, -0));
  assert(isnt(-0, 0));
  assertFalse(isnt(-0, -0));
});

Deno.test("isnt() returns false for NaN compared with NaN", () => {
  assertFalse(isnt(NaN, NaN));
});

Deno.test("isnt() returns true for clearly different values", () => {
  assert(isnt("a", "b"));
  assert(isnt(1, 2));
  assert(isnt(true, false));
  assert(isnt({}, {}));
  assert(isnt([], []));
});

Deno.test("isnt() returns false for same object reference", () => {
  const obj = {};
  assertFalse(isnt(obj, obj));
});

Deno.test("isnt() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing both arguments
  assertThrows(() => isnt(), TypeError);

  // @ts-expect-error - missing second argument
  assertThrows(() => isnt("only one"), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isnt("a", "b", "c"), TypeError);
});
