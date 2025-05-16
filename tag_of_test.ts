import { assertEquals, assertThrows } from "jsr:@std/assert";
import { tagOf } from "./tag_of.ts";

// Primitive & boxed types
Deno.test("tagOf() returns correct tags for primitives and boxed values", () => {
  assertEquals(tagOf(null), "Null");
  assertEquals(tagOf(undefined), "Undefined");
  assertEquals(tagOf(false), "Boolean");
  assertEquals(tagOf(42), "Number");
  assertEquals(tagOf("hi"), "String");
  assertEquals(tagOf(Symbol("x")), "Symbol");
  assertEquals(tagOf(123n), "BigInt");

  assertEquals(tagOf(new Boolean(true)), "Boolean");
  assertEquals(tagOf(new Number(42)), "Number");
  assertEquals(tagOf(new String("boxed")), "String");
});

// Built-in object types
Deno.test("tagOf() returns correct tags for built-in objects", function () {
  assertEquals(tagOf([]), "Array");
  assertEquals(tagOf({}), "Object");
  assertEquals(tagOf(/abc/), "RegExp");
  assertEquals(tagOf(new Date()), "Date");
  assertEquals(tagOf(new Error("err")), "Error");
  assertEquals(tagOf(() => {}), "Function");
  assertEquals(tagOf(new Map()), "Map");
  assertEquals(tagOf(new Set()), "Set");
  assertEquals(tagOf(Promise.resolve()), "Promise");
  assertEquals(tagOf(arguments), "Arguments");
});

Deno.test("tagOf() returns Symbol.toStringTag if defined", () => {
  const custom = { [Symbol.toStringTag]: "Bratwurst" };
  assertEquals(tagOf(custom), "Bratwurst");
});

Deno.test("tagOf() throws when called with no arguments", () => {
  // @ts-expect-error - test invalid usage
  assertThrows(() => tagOf(), TypeError);
});
