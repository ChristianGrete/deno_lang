import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isSymbol } from "./is_symbol.ts";

Deno.test("isSymbol() returns true for primitive symbols", () => {
  assert(isSymbol(Symbol()));
  assert(isSymbol(Symbol("desc")));
  assert(isSymbol(Symbol.iterator));
});

Deno.test("isSymbol() returns true for boxed symbols", () => {
  assert(isSymbol(Object(Symbol("boxed"))));
});

Deno.test("isSymbol() returns false for non-symbol values", () => {
  assertFalse(isSymbol("Symbol()"));
  assertFalse(isSymbol(42));
  assertFalse(isSymbol(null));
  assertFalse(isSymbol(undefined));
  assertFalse(isSymbol([]));
  assertFalse(isSymbol({}));
  assertFalse(isSymbol(() => {}));
  assertFalse(isSymbol(true));
});

Deno.test("isSymbol() acts as a type guard", () => {
  const maybeSymbol: unknown = Symbol("test");

  if (isSymbol(maybeSymbol)) {
    const definitelySymbol: symbol = maybeSymbol;

    assertStrictEquals(typeof definitelySymbol, "symbol");
  }
});

Deno.test("isSymbol() throws on invalid number of arguments", () => {
  // @ts-expect-error - no arguments
  assertThrows(() => isSymbol(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isSymbol(Symbol("x"), "extra"), TypeError);
});
