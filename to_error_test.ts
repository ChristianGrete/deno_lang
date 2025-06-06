import { assertEquals, assertInstanceOf, assertStrictEquals, assertThrows } from "@std/assert";

import { toError } from "./to_error.ts";

Deno.test("toError() returns the same Error instance if already an Error", () => {
  const original = new Error("fail");
  const result = toError(original);

  assertStrictEquals(result, original);
});

Deno.test("toError() converts strings, numbers, and bigints to Error", () => {
  const err1 = toError("fail");

  assertInstanceOf(err1, Error);
  assertStrictEquals(err1.message, "fail");

  const err2 = toError(123);

  assertStrictEquals(err2.message, "123");

  const err3 = toError(42n);

  assertStrictEquals(err3.message, "42");
});

Deno.test("toError() wraps primitives with fallback message in strict mode", () => {
  const err = toError(false, { strict: true });

  assertStrictEquals(err.message, "Error coerced from boolean");
});

Deno.test("toError() returns empty Error for unsupported non-strict values", () => {
  const err = toError(false);

  assertInstanceOf(err, Error);
  assertStrictEquals(err.message, "");
});

Deno.test("toError() extracts message and cause from object", () => {
  const err = toError({ cause: new Error("root"), message: "boom" });

  assertStrictEquals(err.message, "boom");
  assertInstanceOf(err.cause, Error);
  assertStrictEquals(err.cause?.message, "root");
});

Deno.test("toError() uses fallback for object in strict mode when message is invalid", () => {
  const err = toError({ msg: "ignored" }, { strict: true });

  assertStrictEquals(err.message, "Error coerced from non-error object");
});

Deno.test("toError() returns Error without message if object has no message (non-strict)", () => {
  const err = toError({ something: true });

  assertEquals(err.message, "");
});

Deno.test("toError() throws on Symbol input", () => {
  assertThrows(() => toError(Symbol("x")), TypeError);
});

Deno.test("toError() supports built-in constructors like TypeError", () => {
  const err = toError("invalid", { errorConstructor: TypeError });

  assertInstanceOf(err, TypeError);
  assertStrictEquals(err.message, "invalid");
});

Deno.test("toError() uses custom constructor when provided", () => {
  class CustomError extends Error {
    constructor(input: symbol) {
      super(input.toString());
    }
    readonly custom = true;
  }

  const sym = Symbol("foo");
  const err = toError(sym, { errorConstructor: CustomError });

  assertInstanceOf(err, CustomError);
  assertStrictEquals(err.message, sym.toString());
  assertEquals(err.custom, true);
});

Deno.test("toError() falls back to default constructor for invalid errorConstructor", () => {
  const err = toError("fail", { errorConstructor: Function as unknown as ErrorConstructor });

  assertInstanceOf(err, Error);
  assertStrictEquals(err.message, "fail");
});

Deno.test("toError() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => toError(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => toError("fail", { strict: true }, "extra"), TypeError);
});
