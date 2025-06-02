import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isError } from "./is_error.ts";

Deno.test("isError() returns true for standard error instances", () => {
  assert(isError(new Error("fail")));
  assert(isError(new TypeError("fail")));
  assert(isError(new SyntaxError("fail")));
  assert(isError(new RangeError("fail")));
});

Deno.test("isError() returns true for custom error subclasses", () => {
  class CustomError extends Error {}
  assert(isError(new CustomError("custom")));
});

Deno.test("isError() returns false for non-error values", () => {
  assertFalse(isError("fail"));
  assertFalse(isError({ message: "fail", name: "Error" }));
  assertFalse(isError(123));
  assertFalse(isError(null));
  assertFalse(isError(undefined));
  assertFalse(isError(Symbol("x")));
  assertFalse(isError([]));
  assertFalse(isError({}));
});

Deno.test("isError() acts as a type guard", () => {
  const maybeError: unknown = new Error("something went wrong");

  if (isError(maybeError)) {
    const definitelyError: Error = maybeError;

    assertStrictEquals(definitelyError.message, "something went wrong");
  }
});

Deno.test("isError() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => isError(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isError(new Error(), "extra"), TypeError);
});
