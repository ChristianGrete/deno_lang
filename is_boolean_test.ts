import { isBoolean } from "./is_boolean.ts";
import {
  assert,
  assertFalse,
  assertStrictEquals,
  assertThrows,
} from "@std/assert";

Deno.test("isBoolean() returns true for primitive booleans", () => {
  assert(isBoolean(true));
  assert(isBoolean(false));
});

Deno.test("isBoolean() returns true for Boolean objects", () => {
  assert(isBoolean(new Boolean(true)));
  assert(isBoolean(new Boolean(false)));
});

Deno.test("isBoolean() returns false for non-boolean values", () => {
  assertFalse(isBoolean(undefined));
  assertFalse(isBoolean(null));
  assertFalse(isBoolean(0));
  assertFalse(isBoolean(1));
  assertFalse(isBoolean(""));
  assertFalse(isBoolean("true"));
  assertFalse(isBoolean({}));
  assertFalse(isBoolean([]));
  assertFalse(isBoolean(() => true));
});

Deno.test("isBoolean() acts as a type guard", () => {
  const val: unknown = Math.random() > 0.5 ? true : "nope";
  if (isBoolean(val)) {
    // TypeScript should now know this is boolean
    const result: boolean = val;
    assertStrictEquals(typeof result, "boolean");
  }
});

Deno.test("isBoolean() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => isBoolean(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isBoolean(true, true), TypeError);
});
