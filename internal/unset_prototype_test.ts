import { assertEquals, assertThrows } from "jsr:@std/assert";
import { unsetPrototype } from "./unset_prototype.ts";

Deno.test("unsetPrototype() sets function prototype to null", () => {
  const func = function () {};

  unsetPrototype(func);

  assertEquals(func.prototype, null);
});

Deno.test("unsetPrototype() makes prototype non-configurable, non-enumerable, non-writable", () => {
  const func = function () {};

  unsetPrototype(func);

  assertThrows(() => {
    Object.defineProperty(func, "prototype", { value: {}, writable: true });
  });

  const descriptor = Object.getOwnPropertyDescriptor(func, "prototype");
  assertEquals(descriptor?.configurable, false);
  assertEquals(descriptor?.enumerable, false);
  assertEquals(descriptor?.writable, false);
});

Deno.test("unsetPrototype() does nothing if argument is not a function", () => {
  const nonFunc: Record<string, unknown> = {};

  unsetPrototype(nonFunc as unknown);

  assertEquals(nonFunc["prototype"], undefined);
});
