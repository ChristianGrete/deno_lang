import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { hasTag } from "./has_tag.ts";

Deno.test("hasTag() returns true for matching built-in tags", () => {
  assert(hasTag([], "Array"));
  assert(hasTag(new Date(), "Date"));
  assert(hasTag(() => {}, "Function"));
  assert(hasTag(/x/, "RegExp"));
  assert(hasTag(null, "Null"));
  assert(hasTag(undefined, "Undefined"));
  assert(hasTag(new Map(), "Map"));
  assert(hasTag(new Set(), "Set"));
  assert(hasTag(Promise.resolve(), "Promise"));
});

Deno.test("hasTag() returns false for mismatched tags", () => {
  assertFalse(hasTag({}, "Array"));
  assertFalse(hasTag([], "Object"));
  assertFalse(hasTag(new Date(), "Error"));
  assertFalse(hasTag(() => {}, "RegExp"));
  assertFalse(hasTag(undefined, "Null"));
  assertFalse(hasTag(null, "Undefined"));
});

Deno.test("hasTag() returns false for unknown or custom tags", () => {
  assertFalse(hasTag([], "Foobar"));
  assertFalse(hasTag({}, "HTMLDivElement"));
});

Deno.test("hasTag() narrows types when true", () => {
  const maybeNum: unknown = 42;

  if (hasTag(maybeNum, "Number")) {
    const definitelyNum: number = maybeNum;

    assertStrictEquals(typeof definitelyNum, "number");
  }
});

Deno.test("hasTag() throws on invalid arguments", () => {
  // @ts-expect-error - missing both arguments
  assertThrows(() => hasTag(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => hasTag([], "Array", "extra"), TypeError);

  // @ts-expect-error - tag is not a string
  assertThrows(() => hasTag([], 123), TypeError);

  // @ts-expect-error - tag is a symbol
  assertThrows(() => hasTag([], Symbol("x")), TypeError);

  // @ts-expect-error - tag is null
  assertThrows(() => hasTag([], null), TypeError);
});
