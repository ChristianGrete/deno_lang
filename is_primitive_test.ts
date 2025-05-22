import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isPrimitive, type Primitive, type PrimitiveType, primitiveTypes } from "./is_primitive.ts";

Deno.test("isPrimitive() returns true for primitive values", () => {
  assert(isPrimitive(undefined));
  assert(isPrimitive(null));
  assert(isPrimitive(false));
  assert(isPrimitive(true));
  assert(isPrimitive(0));
  assert(isPrimitive(-42));
  assert(isPrimitive(3.14));
  assert(isPrimitive("hello"));
  assert(isPrimitive(Symbol("sym")));
  assert(isPrimitive(123n)); // bigint
});

Deno.test("isPrimitive() returns false for boxed primitives", () => {
  assertFalse(isPrimitive(new Boolean(true)));
  assertFalse(isPrimitive(new Number(42)));
  assertFalse(isPrimitive(new String("boxed")));
});

Deno.test("isPrimitive() returns false for non-primitive objects", () => {
  assertFalse(isPrimitive([]));
  assertFalse(isPrimitive({}));
  assertFalse(isPrimitive(/regex/));
  assertFalse(isPrimitive(new Date()));
  assertFalse(isPrimitive(new Map()));
  assertFalse(isPrimitive(Promise.resolve()));
});

Deno.test("isPrimitive() narrows types when true", () => {
  const maybePrimitive: unknown = false;

  if (isPrimitive(maybePrimitive)) {
    const definitelyPrimitive: Primitive = maybePrimitive;

    assertStrictEquals(typeof definitelyPrimitive, "boolean");
  }
});

Deno.test("isPrimitive() throws on invalid number of arguments", () => {
  // @ts-expect-error - test intentional invalid usage
  assertThrows(() => isPrimitive(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isPrimitive("foo", "bar"), TypeError);
});

Deno.test("primitiveTypes contains the correct typeof values", () => {
  for (const type of ["bigint", "boolean", "null", "number", "string", "symbol", "undefined"] as PrimitiveType[]) {
    assert(primitiveTypes.has(type));
  }

  assertFalse(primitiveTypes.has("object" as PrimitiveType));
  assertFalse(primitiveTypes.has("function" as PrimitiveType));
});
