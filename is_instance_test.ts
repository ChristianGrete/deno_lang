import { assert } from "@std/assert";

import { isInstance } from "./is_instance.ts";

Deno.test("isInstance() behaves as alias for instanceOf()", () => {
  assert(isInstance([], Array));
  assert(isInstance(new Date(), Date));
  assert(isInstance("foo", String)); // boxed
});
