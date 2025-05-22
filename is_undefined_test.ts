import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isUndefined } from "./is_undefined.ts";

Deno.test("isUndefined() returns true for undefined", () => {
  assert(isUndefined(undefined));
});

Deno.test("isUndefined() returns false for non-undefined values", () => {
  assertFalse(isUndefined(null));
  assertFalse(isUndefined(0));
  assertFalse(isUndefined(""));
  assertFalse(isUndefined(false));
  assertFalse(isUndefined(NaN));
  assertFalse(isUndefined([]));
  assertFalse(isUndefined({}));
  assertFalse(isUndefined(() => {}));
  assertFalse(isUndefined(Symbol("undef")));
});

Deno.test("isUndefined() acts as a type guard", () => {
  const maybeUndef: unknown = undefined;

  if (isUndefined(maybeUndef)) {
    const definitelyUndef: undefined = maybeUndef;

    assertStrictEquals(definitelyUndef, undefined);
  }
});

Deno.test("isUndefined() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isUndefined(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isUndefined(undefined, null), TypeError);
});
