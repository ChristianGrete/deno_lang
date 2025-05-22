import { assert, assertFalse, assertThrows } from "@std/assert";

import { is } from "./is.ts";

Deno.test("is() returns true for strictly identical primitives", () => {
  assert(is(1, 1));
  assert(is("foo", "foo"));
  assert(is(true, true));
  assert(is(null, null));
  assert(is(undefined, undefined));
  assert(is(Symbol.for("x"), Symbol.for("x")));
});

Deno.test("is() distinguishes 0 and -0", () => {
  assertFalse(is(0, -0));
  assertFalse(is(-0, 0));
  assert(is(-0, -0));
});

Deno.test("is() returns true for NaN compared with NaN", () => {
  assert(is(NaN, NaN));
});

Deno.test("is() returns false for non-identical values", () => {
  assertFalse(is({}, {}));
  assertFalse(is([], []));
  assertFalse(is("foo", "bar"));
  assertFalse(is(1, "1"));
  assertFalse(is(true, false));
});

Deno.test("is() returns true for the same object reference", () => {
  const obj = {};
  assert(is(obj, obj));

  const arr: unknown[] = [];
  assert(is(arr, arr));
});

Deno.test("is() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing both arguments
  assertThrows(() => is(), TypeError);

  // @ts-expect-error - missing second argument
  assertThrows(() => is("foo"), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => is(1, 2, 3), TypeError);
});
