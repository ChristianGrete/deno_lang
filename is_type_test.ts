import { assert, assertFalse, assertThrows } from "@std/assert";

import { isType } from "./is_type.ts";

Deno.test("isType() returns true for matching primitive types", () => {
  assert(isType("hello", "string"));
  assert(isType(42, "number"));
  assert(isType(true, "boolean"));
  assert(isType(Symbol("x"), "symbol"));
  assert(isType(9007199254740991n, "bigint"));
  assert(isType(undefined, "undefined"));
  assert(isType(null, "null"));
});

Deno.test("isType() returns true for matching object types", function () {
  assert(isType([], "array"));
  assert(isType(arguments, "arguments"));
  assert(isType(new Date(), "date"));
  assert(isType(new Error("fail"), "error"));
  assert(isType(() => {}, "function"));
  assert(isType(new Map(), "map"));
  assert(isType({}, "object"));
  assert(isType(Promise.resolve(), "promise"));
  assert(isType(/abc/, "regexp"));
  assert(isType(new Set(), "set"));

  // boxed primitives
  assert(isType(new String("foo"), "string"));
  assert(isType(new Number(123), "number"));
  assert(isType(new Boolean(false), "boolean"));
});

Deno.test("isType() returns false for mismatched types", () => {
  assertFalse(isType("123", "number"));
  assertFalse(isType(123, "string"));
  assertFalse(isType([], "object")); // distinction check
  assertFalse(isType({}, "array"));
  assertFalse(isType(() => {}, "object"));
  assertFalse(isType(null, "object"));
});

Deno.test("isType() throws on invalid arguments", () => {
  // @ts-expect-error - missing both arguments
  assertThrows(() => isType(), TypeError);

  // @ts-expect-error - only one argument
  assertThrows(() => isType("foo"), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isType("foo", "string", "extra"), TypeError);

  // @ts-expect-error - non-string type
  assertThrows(() => isType({}, {}), TypeError);

  // @ts-expect-error - type is symbol
  assertThrows(() => isType({}, Symbol("type")), TypeError);

  // @ts-expect-error - type is null
  assertThrows(() => isType({}, null), TypeError);
});
