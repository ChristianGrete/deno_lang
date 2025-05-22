import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { instanceOf } from "./instance_of.ts";

class Person {}
class Animal {}
function CustomFunction() {}

Deno.test("instanceOf() returns true for matching constructors", () => {
  assert(instanceOf(new Person(), Person));
  assert(instanceOf([], Array));
  assert(instanceOf(new Date(), Date));
  assert(instanceOf(/regex/, RegExp));
  assert(instanceOf(() => {}, Function));
});

Deno.test("instanceOf() returns false for mismatched constructors", () => {
  assertFalse(instanceOf(new Person(), Animal));
  assertFalse(instanceOf("foo", Number));
  assertFalse(instanceOf([], Set));
  assertFalse(instanceOf({}, CustomFunction));
});

Deno.test("instanceOf() returns true for boxed primitives and auto-boxes", () => {
  assert(instanceOf(new String("foo"), String));
  assert(instanceOf(new Number(123), Number));
  assert(instanceOf(new Boolean(false), Boolean));

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
    const definitelyDate: Date = maybeDate;

    assert(definitelyDate instanceof Date);
    assertStrictEquals(typeof definitelyDate.getTime, "function");
  }
});

Deno.test("instanceOf() throws on invalid arguments", () => {
  // @ts-expect-error - missing both arguments
  assertThrows(() => instanceOf(), TypeError);

  // @ts-expect-error - only one argument
  assertThrows(() => instanceOf({}), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => instanceOf({}, Object, "extra"), TypeError);

  // @ts-expect-error - constructable is not a function
  assertThrows(() => instanceOf({}, 123), TypeError);

  // @ts-expect-error - constructable is null
  assertThrows(() => instanceOf({}, null), TypeError);

  // @ts-expect-error - constructable is a symbol
  assertThrows(() => instanceOf({}, Symbol("x")), TypeError);
});
