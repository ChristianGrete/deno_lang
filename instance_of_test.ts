import { assert, assertFalse, assertThrows } from "@std/assert";
import { instanceOf } from "./instance_of.ts";

class Person {}
class Animal {}
function CustomFunction() {}

Deno.test("instanceOf() returns true for instances of given constructor", () => {
  assert(instanceOf(new Person(), Person));
  assert(instanceOf([], Array));
  assert(instanceOf(new Date(), Date));
  assert(instanceOf(/regex/, RegExp));
});

Deno.test("instanceOf() returns false for mismatched constructor", () => {
  assertFalse(instanceOf(new Person(), Animal));
  assertFalse(instanceOf("foo", Number)); // mismatched constructor
  assertFalse(instanceOf([], Set));
  assertFalse(instanceOf({}, CustomFunction));
});

Deno.test("instanceOf() handles boxed primitives correctly", () => {
  // Boxed primitive objects
  assert(instanceOf(new String("foo"), String));
  assert(instanceOf(new Number(123), Number));
  assert(instanceOf(new Boolean(false), Boolean));

  // Primitive values get auto-boxed internally
  assert(instanceOf("foo", String));
  assert(instanceOf(123, Number));
  assert(instanceOf(true, Boolean));
});

Deno.test("instanceOf() returns false for null and undefined", () => {
  assertFalse(instanceOf(null, Object));
  assertFalse(instanceOf(undefined, Object));
});

Deno.test("instanceOf() narrows types when true", () => {
  const maybeDate: unknown = new Date();

  if (instanceOf(maybeDate, Date)) {
    // TypeScript now knows: maybeDate is Date
    assert(maybeDate instanceof Date);
    assert(typeof maybeDate.getTime === "function");
  }
});

Deno.test("instanceOf() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => instanceOf(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => instanceOf({}, Object, "extra"), TypeError);
});
