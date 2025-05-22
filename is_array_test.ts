import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isArray } from "./is_array.ts";

Deno.test("isArray() returns true for real arrays", () => {
  assert(isArray([]));
  // deno-lint-ignore no-array-constructor
  assert(isArray(new Array()));
  assert(isArray([1, 2, 3]));
});

Deno.test("isArray() returns false for non-array types", () => {
  assertFalse(isArray(undefined));
  assertFalse(isArray(null));
  assertFalse(isArray(true));
  assertFalse(isArray(42));
  assertFalse(isArray("hello"));
  assertFalse(isArray(Symbol("sym")));
  assertFalse(isArray(10n));
  assertFalse(isArray(() => {}));
  assertFalse(isArray({}));
  assertFalse(isArray(Object.create(null)));
});

Deno.test("isArray() returns false for array-like but non-array objects", function () {
  assertFalse(isArray(arguments));
  assertFalse(isArray({ length: 1 }));
  assertFalse(isArray(new Set()));
  assertFalse(isArray(new Map()));
  assertFalse(isArray(new Uint8Array(3)));
  // assertFalse(isArray(document?.querySelectorAll?.("div") ?? {}));
});

Deno.test("isArray() acts as a type guard", () => {
  const maybeArr: unknown = [];

  if (isArray(maybeArr)) {
    const definitelyArr: unknown[] = maybeArr;

    assertStrictEquals(Array.isArray(definitelyArr), true);
  }
});

Deno.test("isArray() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => isArray(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isArray([], []), TypeError);
});
