import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isSet } from "./is_set.ts";

Deno.test("isSet() returns true for Set instances", () => {
  assert(isSet(new Set()));
  assert(isSet(Object(new Set())));
});

Deno.test("isSet() returns false for non-Set values", () => {
  assertFalse(isSet(new WeakSet()));
  assertFalse(isSet([]));
  assertFalse(isSet({}));
  assertFalse(isSet({ add() {}, has() {} }));
  assertFalse(isSet(null));
  assertFalse(isSet(undefined));
  assertFalse(isSet(123));
  assertFalse(isSet("Set"));
  assertFalse(isSet(Symbol("set")));
  assertFalse(isSet(() => {}));
});

Deno.test("isSet() acts as a type guard", () => {
  const maybeSet: unknown = new Set();

  if (isSet(maybeSet)) {
    const definitelySet: Set<unknown> = maybeSet;

    definitelySet.add("x");

    assertStrictEquals(definitelySet.has("x"), true);
  }
});

Deno.test("isSet() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => isSet(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isSet(new Set(), "extra"), TypeError);
});
