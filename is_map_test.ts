import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isMap } from "./is_map.ts";

Deno.test("isMap() returns true for Map instances", () => {
  assert(isMap(new Map()));
  assert(isMap(Object(new Map())));
});

Deno.test("isMap() returns false for non-Map values", () => {
  assertFalse(isMap(new WeakMap()));
  assertFalse(isMap({}));
  assertFalse(isMap({ get() {}, set() {} }));
  assertFalse(isMap(null));
  assertFalse(isMap(undefined));
  assertFalse(isMap([]));
  assertFalse(isMap(123));
  assertFalse(isMap("Map"));
  assertFalse(isMap(Symbol("map")));
  assertFalse(isMap(() => {}));
});

Deno.test("isMap() acts as a type guard", () => {
  const maybeMap: unknown = new Map();

  if (isMap(maybeMap)) {
    const definitelyMap: Map<unknown, unknown> = maybeMap;

    definitelyMap.set("x", 1);

    assertStrictEquals(definitelyMap.get("x"), 1);
  }
});

Deno.test("isMap() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => isMap(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isMap(new Map(), {}), TypeError);
});
