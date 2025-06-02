import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isBigInt } from "./is_bigint.ts";

Deno.test("isBigInt() returns true for primitive bigint values", () => {
  assert(isBigInt(0n));
  assert(isBigInt(42n));
  assert(isBigInt(BigInt("123456789123456789")));
});

Deno.test("isBigInt() returns true for wrapped bigint objects", () => {
  assert(isBigInt(Object(42n)));
  assert(isBigInt(Object(BigInt("9999"))));
});

Deno.test("isBigInt() returns false for non-bigint values", () => {
  assertFalse(isBigInt(42));
  assertFalse(isBigInt("123"));
  assertFalse(isBigInt(null));
  assertFalse(isBigInt(undefined));
  assertFalse(isBigInt([]));
  assertFalse(isBigInt({}));
  assertFalse(isBigInt(() => {}));
  assertFalse(isBigInt(Symbol("1")));
});

Deno.test("isBigInt() acts as a type guard", () => {
  const maybeBig: unknown = 123n;

  if (isBigInt(maybeBig)) {
    const definitelyBig: bigint = maybeBig;

    assertStrictEquals(typeof definitelyBig, "bigint");
  }
});

Deno.test("isBigInt() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => isBigInt(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isBigInt(1n, 2), TypeError);
});
