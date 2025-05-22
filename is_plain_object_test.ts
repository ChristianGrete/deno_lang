import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isPlainObject } from "./is_plain_object.ts";

Deno.test("isPlainObject() returns true for plain objects", () => {
  assert(isPlainObject({}));
  assert(isPlainObject(new Object()));
  assert(isPlainObject(Object.create(null)));
});

Deno.test("isPlainObject() returns false for non-plain objects", () => {
  assertFalse(isPlainObject([]));
  assertFalse(isPlainObject(new Date()));
  assertFalse(isPlainObject(new (class {})()));
  assertFalse(isPlainObject(Object.create({}))); // custom prototype
});

Deno.test("isPlainObject() returns false for non-object values", () => {
  assertFalse(isPlainObject(null));
  assertFalse(isPlainObject(undefined));
  assertFalse(isPlainObject(42));
  assertFalse(isPlainObject("plain"));
  assertFalse(isPlainObject(true));
  assertFalse(isPlainObject(Symbol("obj")));
  assertFalse(isPlainObject(() => {}));
});

Deno.test("isPlainObject() acts as a type guard", () => {
  const maybeObj: unknown = { foo: "bar" };

  if (isPlainObject(maybeObj)) {
    const definitelyObj: Record<PropertyKey, unknown> = maybeObj;

    assertStrictEquals(typeof definitelyObj, "object");
  }
});

Deno.test("isPlainObject() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isPlainObject(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isPlainObject({}, null), TypeError);
});
