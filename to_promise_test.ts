import { assertEquals, assertInstanceOf, assertRejects, assertStrictEquals, assertThrows } from "@std/assert";

import { toPromise } from "./to_promise.ts";

Deno.test("toPromise() returns the original promise if input is already a Promise", async () => {
  const original = Promise.resolve("yay");
  const result = toPromise(original);
  assertStrictEquals(await result, "yay");
  assertStrictEquals(result, original);
});

Deno.test("toPromise() wraps thenables via Promise.resolve", async () => {
  const thenable = {
    then(resolve: (_val: string) => void) {
      resolve("wrapped!");
    },
  };
  const result = toPromise(thenable);
  assertInstanceOf(result, Promise);
  assertEquals(await result, "wrapped!");
});

Deno.test("toPromise() wraps primitives into resolved Promises", async () => {
  assertEquals(await toPromise("hi"), "hi");
  assertEquals(await toPromise(123), 123);
  assertEquals(await toPromise(false), false);
  assertEquals(await toPromise(undefined), undefined);
  assertEquals(await toPromise(null), null);
});

Deno.test("toPromise() wraps non-thenable objects into resolved Promises", async () => {
  const result = await toPromise({ msg: "yo" });
  assertEquals(result, { msg: "yo" });
});

Deno.test("toPromise() allows rejected promises to propagate", async () => {
  const rejected = Promise.reject("fail");
  await assertRejects(() => toPromise(rejected), "fail");
});

Deno.test("toPromise() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => toPromise(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => toPromise("yay", "extra"), TypeError);
});
