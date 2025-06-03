import { assert, assertStrictEquals, assertThrows } from "@std/assert";

import { toString } from "./to_string.ts";

Deno.test("toString() returns an empty string for null or undefined", () => {
  assertStrictEquals(toString(null), "");
  assertStrictEquals(toString(undefined), "");
});

Deno.test("toString() converts primitives to strings", () => {
  assertStrictEquals(toString(42), "42");
  assertStrictEquals(toString(-1.5), "-1.5");
  assertStrictEquals(toString(true), "true");
  assertStrictEquals(toString(false), "false");
  assertStrictEquals(toString(Symbol("x")), "Symbol(x)");
});

Deno.test("toString() handles boxed primitives", () => {
  assertStrictEquals(toString(Object(42)), "42");
  assertStrictEquals(toString(new Number(3.14)), "3.14");

  assertStrictEquals(toString(Object(true)), "true");
  assertStrictEquals(toString(new Boolean(false)), "false");

  assertStrictEquals(toString(Object("abc")), "abc");
  assertStrictEquals(toString(new String("xyz")), "xyz");

  assertStrictEquals(toString(Object(Symbol("foo"))), "Symbol(foo)");
});

Deno.test("toString() converts objects to strings via String()", () => {
  assertStrictEquals(toString({}), "[object Object]");
  assertStrictEquals(toString([1, 2, 3]), "1,2,3");
});

Deno.test("toString() converts functions to string representations", () => {
  const fnString = toString(() => {});

  assertStrictEquals(typeof fnString, "string");
  assert(fnString.includes("=>") || fnString.includes("function"));
});

Deno.test("toString() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => toString(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => toString("a", "b"), TypeError);
});
