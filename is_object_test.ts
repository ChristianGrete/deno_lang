import { assert, assertFalse, assertThrows } from "@std/assert";
import { isObject } from "./is_object.ts";

Deno.test("isObject() returns true for plain objects", () => {
  assert(isObject({}));
  assert(isObject(new Object()));
  assert(isObject(Object.create(null)));
  assert(isObject({ a: 1, b: 2 }));
});

Deno.test("isObject() returns false for non-object types", () => {
  assertFalse(isObject(null)); // special case
  assertFalse(isObject(undefined));
  assertFalse(isObject(false));
  assertFalse(isObject(123));
  assertFalse(isObject("string"));
  assertFalse(isObject(Symbol("sym")));
  assertFalse(isObject(100n));
  assertFalse(isObject(() => {}));
});

Deno.test("isObject() returns false for built-in non-plain objects", () => {
  assertFalse(isObject([]));
  assertFalse(isObject(new Date()));
  assertFalse(isObject(/regex/));
  assertFalse(isObject(new Map()));
  assertFalse(isObject(new Set()));
  assertFalse(isObject(Promise.resolve()));
});

Deno.test("isObject() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => isObject(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isObject({}, {}), TypeError);
});
