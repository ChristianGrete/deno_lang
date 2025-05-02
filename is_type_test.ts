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
  assert(isType(new String("foo"), "string")); // boxed
  assert(isType(new Number(123), "number")); // boxed
  assert(isType(new Boolean(false), "boolean")); // boxed
});

Deno.test("isType() returns false for mismatched types", () => {
  assertFalse(isType("123", "number"));
  assertFalse(isType(123, "string"));
  assertFalse(isType([], "object")); // intentionally tests distinction
  assertFalse(isType({}, "array"));
  assertFalse(isType(() => {}, "object"));
  assertFalse(isType(null, "object"));
});

Deno.test("isType() throws for non-string type argument", () => {
  // @ts-expect-error — invalid usage
  assertThrows(() => isType({}, {}), TypeError);
  // @ts-expect-error — missing type
  assertThrows(() => isType("foo"), TypeError);
  // @ts-expect-error — too many args
  assertThrows(() => isType("foo", "string", "extra"), TypeError);
});
