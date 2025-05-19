import { assert, assertFalse, assertThrows } from "jsr:@std/assert";

import { isEmpty } from "./is_empty.ts";

Deno.test("isEmpty() returns true for null and undefined", () => {
  assert(isEmpty(null));
  assert(isEmpty(undefined));
});

Deno.test("isEmpty() returns true for empty strings and arrays", () => {
  assert(isEmpty(""));
  assert(isEmpty([]));
});

Deno.test("isEmpty() returns false for non-empty strings and arrays", () => {
  assertFalse(isEmpty("hello"));
  assertFalse(isEmpty(["item"]));
});

Deno.test("isEmpty() returns true for empty Map and Set", () => {
  assert(isEmpty(new Map()));
  assert(isEmpty(new Set()));
});

Deno.test("isEmpty() returns false for non-empty Map and Set", () => {
  assertFalse(isEmpty(new Map([["key", "value"]])));
  assertFalse(isEmpty(new Set(["value"])));
});

Deno.test("isEmpty() returns true for empty plain objects", () => {
  assert(isEmpty({}));
  assert(isEmpty(Object.create(null)));
});

Deno.test("isEmpty() returns false for objects with own properties", () => {
  assertFalse(isEmpty({ foo: 1 }));
  assertFalse(isEmpty(Object.create(null, { bar: { enumerable: true, value: 2 } })));
});

Deno.test("isEmpty() ignores inherited properties", () => {
  const proto = { x: 1 };
  const obj = Object.create(proto);
  assert(isEmpty(obj));
});

Deno.test("isEmpty() returns false for values that are not containers", () => {
  assertFalse(isEmpty(0));
  assertFalse(isEmpty(NaN));
  assertFalse(isEmpty(false));
  assertFalse(isEmpty(() => {}));
  assertFalse(isEmpty(Symbol("foo")));
  assertFalse(isEmpty(BigInt(0)));
});

Deno.test("isEmpty() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isEmpty(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isEmpty("", ""), TypeError);
});
