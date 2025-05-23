import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isArrayLike } from "./is_array_like.ts";

function getArguments(_x: string, _y: string): ArrayLike<string> {
  return arguments;
}

Deno.test("isArrayLike() returns true for valid array-like values", () => {
  assert(isArrayLike([]));
  assert(isArrayLike("hi"));
  assert(isArrayLike(new Array(3)));
  assert(isArrayLike({ 0: "a", 1: "b", length: 2 }));
  assert(isArrayLike(getArguments("x", "y")));
});

Deno.test("isArrayLike() returns false for non-array-like values", () => {
  assertFalse(isArrayLike(null));
  assertFalse(isArrayLike(undefined));
  assertFalse(isArrayLike(true));
  assertFalse(isArrayLike(123));
  assertFalse(isArrayLike({ length: -1 }));
  assertFalse(isArrayLike({ length: 2 })); // missing indexed props
  assertFalse(isArrayLike(() => {}));
  assertFalse(isArrayLike(globalThis));
});

Deno.test("isArrayLike() returns false for array-like imposters", () => {
  assert(isArrayLike({ 0: undefined, length: 1 })); // missing value
  assertFalse(isArrayLike({ 2: "value", length: 1 })); // gap in range
});

Deno.test("isArrayLike() acts as a type guard", () => {
  const maybeArrayLike: unknown = "test";

  if (isArrayLike(maybeArrayLike)) {
    const definitelyArrayLike: ArrayLike<unknown> = maybeArrayLike;

    assertStrictEquals(typeof definitelyArrayLike.length, "number");
  }
});

Deno.test("isArrayLike() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isArrayLike(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isArrayLike([], 1), TypeError);
});
