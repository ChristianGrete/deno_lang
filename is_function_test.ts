import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { type Func, isFunction } from "./is_function.ts";

Deno.test("isFunction() returns true for function values", () => {
  assert(isFunction(function () {}));
  assert(isFunction(() => {}));
  assert(isFunction(async () => {}));
  assert(isFunction(class {})); // functions are constructors too
  assert(isFunction(function* () {})); // generator function
  assert(isFunction(new Function()));
});

Deno.test("isFunction() returns false for non-function values", () => {
  assertFalse(isFunction(null));
  assertFalse(isFunction(undefined));
  assertFalse(isFunction(123));
  assertFalse(isFunction("hello"));
  assertFalse(isFunction({}));
  assertFalse(isFunction([]));
  assertFalse(isFunction(/regex/));
  assertFalse(isFunction(new Date()));
});

Deno.test("isFunction() acts as a type guard", () => {
  const maybeFn: unknown = () => {};

  if (isFunction(maybeFn)) {
    const definitelyFn: Func = maybeFn;

    assertStrictEquals(typeof definitelyFn, "function");
  }
});

Deno.test("isFunction() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => isFunction(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isFunction(() => {}, "extra"), TypeError);
});
