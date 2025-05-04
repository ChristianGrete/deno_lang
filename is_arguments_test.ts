import { assert, assertFalse, assertThrows } from "@std/assert";
import { type Arguments, isArguments } from "./is_arguments.ts";

Deno.test("isArguments() returns true for arguments list", () => {
  function getArgs(..._: unknown[]): Arguments {
    return arguments;
  }

  const args = getArgs(1, 2, 3);
  assert(isArguments(args));
});

Deno.test("isArguments() returns false for arrays and array-like objects", () => {
  assertFalse(isArguments([]));
  assertFalse(isArguments([1, 2, 3]));
  assertFalse(isArguments({ 0: "a", 1: "b", length: 2 }));
});

Deno.test("isArguments() returns false for non-object types", () => {
  assertFalse(isArguments(undefined));
  assertFalse(isArguments(null));
  assertFalse(isArguments(true));
  assertFalse(isArguments(42));
  assertFalse(isArguments("hello"));
  assertFalse(isArguments(Symbol("sym")));
  assertFalse(isArguments(100n));
});

Deno.test("isArguments() returns false for functions and objects", () => {
  assertFalse(isArguments(() => {}));
  assertFalse(isArguments({}));
  assertFalse(isArguments(new Date()));
  assertFalse(isArguments(/regex/));
  assertFalse(isArguments(new Map()));
});

Deno.test("isArguments() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => isArguments(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isArguments({}, {}), TypeError);
});
