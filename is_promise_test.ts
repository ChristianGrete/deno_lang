import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isPromise } from "./is_promise.ts";

Deno.test("isPromise() returns true for Promise instances", () => {
  assert(isPromise(Promise.resolve()));
  assert(isPromise(new Promise(() => {})));
});

Deno.test("isPromise() returns false for thenables or fake promises", () => {
  assertFalse(isPromise({ then: () => {} }));
  assertFalse(isPromise({ then: async () => {} }));
  assertFalse(isPromise({ catch: () => {} }));
  assertFalse(isPromise({}));
});

Deno.test("isPromise() returns false for non-promise values", () => {
  assertFalse(isPromise("promise"));
  assertFalse(isPromise(42));
  assertFalse(isPromise(null));
  assertFalse(isPromise(undefined));
  assertFalse(isPromise([]));
  assertFalse(isPromise(() => {}));
  assertFalse(isPromise(Symbol("promise")));
  assertFalse(isPromise(true));
});

Deno.test("isPromise() acts as a type guard", () => {
  const maybePromise: unknown = Promise.resolve(123);

  if (isPromise(maybePromise)) {
    const definitelyPromise: Promise<unknown> = maybePromise;

    assertStrictEquals(typeof definitelyPromise.then, "function");
  }
});

Deno.test("isPromise() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => isPromise(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isPromise(Promise.resolve(), "extra"), TypeError);
});
