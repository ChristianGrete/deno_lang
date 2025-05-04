import { assertEquals, assertThrows } from "@std/assert";
import { tagLabelOf } from "./tag_label_of.ts";

// Helper for custom toStringTag
class CustomTag {
  get [Symbol.toStringTag]() {
    return "CustomTag";
  }
}

Deno.test("tagLabelOf() returns correct tag labels for built-in types", () => {
  function args() {
    return arguments;
  }

  assertEquals(tagLabelOf(undefined), "[object Undefined]");
  assertEquals(tagLabelOf(null), "[object Null]");
  assertEquals(tagLabelOf(false), "[object Boolean]");
  assertEquals(tagLabelOf(123), "[object Number]");
  assertEquals(tagLabelOf("hello"), "[object String]");
  assertEquals(tagLabelOf(Symbol()), "[object Symbol]");
  assertEquals(tagLabelOf(123n), "[object BigInt]");
  assertEquals(tagLabelOf([]), "[object Array]");
  assertEquals(tagLabelOf({}), "[object Object]");
  assertEquals(tagLabelOf(/regex/), "[object RegExp]");
  assertEquals(tagLabelOf(new Date()), "[object Date]");
  assertEquals(tagLabelOf(new Map()), "[object Map]");
  assertEquals(tagLabelOf(new Set()), "[object Set]");
  assertEquals(tagLabelOf(Promise.resolve()), "[object Promise]");
  assertEquals(tagLabelOf(function () {}), "[object Function]");
  assertEquals(tagLabelOf(args()), "[object Arguments]");
});

Deno.test("tagLabelOf() respects Symbol.toStringTag", () => {
  const custom = new CustomTag();
  assertEquals(tagLabelOf(custom), "[object CustomTag]");
});

Deno.test("tagLabelOf() throws on invalid number of arguments", () => {
  // @ts-expect-error - test missing argument
  assertThrows(() => tagLabelOf(), TypeError);

  // @ts-expect-error - test too many arguments
  assertThrows(() => tagLabelOf("a", "b"), TypeError);
});
