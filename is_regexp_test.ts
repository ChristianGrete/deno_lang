import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isRegExp } from "./is_regexp.ts";

Deno.test("isRegExp() returns true for regular expressions", () => {
  assert(isRegExp(/abc/));
  assert(isRegExp(new RegExp("abc")));
  assert(isRegExp(RegExp("abc"))); // without new
  assert(isRegExp(Object(/abc/))); // boxed RegExp - still same object!
});

Deno.test("isRegExp() returns false for non-RegExp values", () => {
  assertFalse(isRegExp(null));
  assertFalse(isRegExp(undefined));
  assertFalse(isRegExp(false));
  assertFalse(isRegExp(0));
  assertFalse(isRegExp(123));
  assertFalse(isRegExp("abc"));
  assertFalse(isRegExp(Symbol("abc")));
  assertFalse(isRegExp(123n));
  assertFalse(isRegExp({}));
  assertFalse(isRegExp([]));
  assertFalse(isRegExp(() => {}));
  assertFalse(isRegExp(new Date()));
  assertFalse(isRegExp(new Map()));
  assertFalse(isRegExp(new Set()));
  assertFalse(isRegExp(Promise.resolve()));
  assertFalse(isRegExp({ flags: "g", source: "abc" })); // RegExp-like plain object
});

Deno.test("isRegExp() does not detect proxied regular expressions", () => {
  const proxy = new Proxy(/abc/, {});

  assertFalse(isRegExp(proxy)); // current implementation can't detect this
});

Deno.test("isRegExp() acts as a type guard", () => {
  const maybeRegExp: unknown = /abc/;

  if (isRegExp(maybeRegExp)) {
    const definitelyRegExp: RegExp = maybeRegExp;

    assertStrictEquals(Object.prototype.toString.call(definitelyRegExp), "[object RegExp]");
  }
});

Deno.test("isRegExp() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => isRegExp(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => isRegExp(/abc/, /extra/), TypeError);
});
