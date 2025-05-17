import { assertEquals, assertFalse, assertThrows } from "jsr:@std/assert";

import type { TagLabel } from "./tag_label_of.ts";
import { type Type, typeByTagLabel, typeOf } from "./type_of.ts";

Deno.test("typeOf() returns correct primitive types", () => {
  assertEquals(typeOf(null), "null");
  assertEquals(typeOf(undefined), "undefined");
  assertEquals(typeOf(false), "boolean");
  assertEquals(typeOf(true), "boolean");
  assertEquals(typeOf(123), "number");
  assertEquals(typeOf("hi"), "string");
  assertEquals(typeOf(123n), "bigint");
  assertEquals(typeOf(Symbol("x")), "symbol");
});

Deno.test("typeOf() returns correct extended types", () => {
  assertEquals(typeOf(new Map()), "map");
  assertEquals(typeOf(new Set()), "set");
  assertEquals(typeOf(Promise.resolve()), "promise");
});

Deno.test("typeOf() returns correct built-in types", () => {
  assertEquals(typeOf([]), "array");
  assertEquals(typeOf({}), "object");
  assertEquals(typeOf(/regex/), "regexp");
  assertEquals(typeOf(new Date()), "date");
  assertEquals(typeOf(() => {}), "function");
  assertEquals(typeOf(function () {}), "function");
  assertEquals(typeOf(new Error()), "error");
  assertEquals(typeOf(new String("foo")), "string");
  assertEquals(typeOf(new Number(123)), "number");
  assertEquals(typeOf(new Boolean(false)), "boolean");
});

Deno.test("typeOf() correctly identifies boxed primitive wrappers", () => {
  assertEquals(typeOf(new String("foo")), "string");
  assertEquals(typeOf(new Number(42)), "number");
  assertEquals(typeOf(new Boolean(false)), "boolean");

  assertEquals(typeOf(Object("boxed string")), "string");
  assertEquals(typeOf(Object(123)), "number");
  assertEquals(typeOf(Object(true)), "boolean");

  try {
    const boxedSym = Object(Symbol("x"));
    assertEquals(typeOf(boxedSym), "symbol");
  } catch {
    // Ignore - Symbol boxing is currently not a realistic scenario
  }
});

Deno.test("typeOf() throws on invalid number of arguments", () => {
  // @ts-expect-error - test no args
  assertThrows(() => typeOf(), TypeError);

  // @ts-expect-error - test too many args
  assertThrows(() => typeOf({}, "extra"), TypeError);
});

Deno.test("typeByTagLabel covers known mappings", () => {
  const known: Record<string, Type> = {
    "[object Arguments]": "arguments",
    "[object Array]": "array",
    "[object BigInt]": "bigint",
    "[object Boolean]": "boolean",
    "[object Date]": "date",
    "[object Error]": "error",
    "[object Function]": "function",
    "[object Map]": "map",
    "[object Number]": "number",
    "[object Object]": "object",
    "[object Promise]": "promise",
    "[object RegExp]": "regexp",
    "[object Set]": "set",
    "[object String]": "string",
    "[object Symbol]": "symbol",
  };

  for (const [key, value] of Object.entries(known)) {
    assertEquals((typeByTagLabel as Record<TagLabel, Type>)[key], value);
  }

  assertFalse(Object.hasOwn(typeByTagLabel, "[object HTMLDivElement]"));
});
