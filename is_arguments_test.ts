import { assert, assertFalse, assertThrows } from "jsr:@std/assert";

import { type Arguments, isArguments } from "./is_arguments.ts";

function getArgs(..._: unknown[]): Arguments {
  return arguments;
}

Deno.test("isArguments() returns true for an arguments object", () => {
  const args = getArgs("foo", 123, false);
  assert(isArguments(args));
});

Deno.test("isArguments() returns false for arrays and array-like objects", () => {
  assertFalse(isArguments([]));
  assertFalse(isArguments([1, 2, 3]));
  assertFalse(isArguments({ 0: "x", 1: "y", length: 2 }));
});

Deno.test("isArguments() returns false for primitive values", () => {
  assertFalse(isArguments(undefined));
  assertFalse(isArguments(null));
  assertFalse(isArguments(true));
  assertFalse(isArguments(123));
  assertFalse(isArguments("hello"));
  assertFalse(isArguments(Symbol("sym")));
  assertFalse(isArguments(123n));
});

Deno.test("isArguments() returns false for non-argument objects", () => {
  assertFalse(isArguments({}));
  assertFalse(isArguments(() => {}));
  assertFalse(isArguments(new Date()));
  assertFalse(isArguments(/x/));
  assertFalse(isArguments(new Map()));
});

Deno.test("isArguments() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isArguments(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isArguments({}, {}), TypeError);
});
