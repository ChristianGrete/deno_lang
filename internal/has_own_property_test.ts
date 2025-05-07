import { assert, assertFalse } from "@std/assert";
import { hasOwnProperty } from "./has_own_property.ts";

Deno.test("hasOwnProperty() returns true for own enumerable properties", () => {
  const obj = { foo: 42 };
  assert(hasOwnProperty(obj, "foo"));
});

Deno.test("hasOwnProperty() returns false for missing properties", () => {
  const obj = { foo: 42 };
  assertFalse(hasOwnProperty(obj, "bar"));
});

Deno.test("hasOwnProperty() returns false for inherited properties", () => {
  const proto = { foo: 1 };
  const obj = Object.create(proto);
  assertFalse(hasOwnProperty(obj, "foo"));
});

Deno.test("hasOwnProperty() works with symbols", () => {
  const sym = Symbol("foo");
  const obj = { [sym]: true };
  assert(hasOwnProperty(obj, sym));
});
