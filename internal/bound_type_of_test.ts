import { assertEquals, assertThrows } from "@std/assert";
import { boundTypeOf } from "./bound_type_of.ts";

Deno.test("boundTypeOf returns expected type", () => {
  assertEquals(boundTypeOf(["string"]), "string");
});

Deno.test("boundTypeOf throws on arity mismatch", () => {
  assertThrows(() => boundTypeOf([]), TypeError);
});
