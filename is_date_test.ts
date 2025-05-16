import { assert, assertFalse, assertStrictEquals, assertThrows } from "jsr:@std/assert";
import { isDate } from "./is_date.ts";

Deno.test("isDate() returns true for Date objects", () => {
  assert(isDate(new Date()));
});

Deno.test("isDate() returns false for non-Date values", () => {
  assertFalse(isDate(Date)); // constructor
  assertFalse(isDate("2023-12-31"));
  assertFalse(isDate(1704067200000)); // timestamp
  assertFalse(isDate({}));
  assertFalse(isDate(null));
  assertFalse(isDate(undefined));
});

Deno.test("isDate() acts as a type guard", () => {
  const maybeDate: unknown = new Date();

  if (isDate(maybeDate)) {
    const definitelyDate: Date = maybeDate;
    assertStrictEquals(definitelyDate instanceof Date, true);
  }
});

Deno.test("isDate() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isDate(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isDate(new Date(), new Date()), TypeError);
});
