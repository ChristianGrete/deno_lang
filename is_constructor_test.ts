import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { type Constructor, isConstructor } from "./is_constructor.ts";

class TestClass {}
function TestFunction() {}

Deno.test("isConstructor() returns true for class constructors", () => {
  assert(isConstructor(TestClass));
  assert(isConstructor(TestFunction));
  assert(isConstructor(Map));
  assert(isConstructor(Set));
  assert(isConstructor(Date));
});

Deno.test("isConstructor() returns false for non-constructors", () => {
  assertFalse(isConstructor(null));
  assertFalse(isConstructor(undefined));
  assertFalse(isConstructor(123));
  assertFalse(isConstructor("test"));
  assertFalse(isConstructor(Symbol("sym")));
  assertFalse(isConstructor(100n));
  assertFalse(isConstructor({}));
  assertFalse(isConstructor([]));

  // function-like but not constructors
  assertFalse(isConstructor(() => {})); // arrow function
  assertFalse(isConstructor(function* () {})); // generator function
  assertFalse(isConstructor(async function () {})); // async function
  assertFalse(isConstructor((function () {}).bind(null))); // bound function
});

Deno.test("isConstructor() acts as a type guard", () => {
  const maybeCtor: unknown = TestClass;

  if (isConstructor(maybeCtor)) {
    const definitelyCtor: Constructor = maybeCtor;

    assertStrictEquals(typeof definitelyCtor, "function");
  }
});

Deno.test("isConstructor() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => isConstructor(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isConstructor(function () {}, {}), TypeError);
});
