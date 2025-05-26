import { assert, assertFalse, assertStrictEquals, assertThrows } from "@std/assert";

import { isWindow } from "./is_window.ts";

Deno.test("isWindow() returns true for a window-like mock", () => {
  const fakeWindow = { self: null as unknown, window: null as unknown };

  fakeWindow.window = fakeWindow;
  fakeWindow.self = fakeWindow;

  assert(isWindow(fakeWindow));
});

Deno.test("isWindow() returns false for non-window values", () => {
  assertFalse(isWindow(globalThis));
  assertFalse(isWindow({}));
  assertFalse(isWindow({ self: {}, window: {} }));
  assertFalse(isWindow(null));
  assertFalse(isWindow(undefined));
  assertFalse(isWindow("window"));
  assertFalse(isWindow(42));
  assertFalse(isWindow([]));
  assertFalse(isWindow(() => {}));
});

Deno.test("isWindow() acts as a type guard", () => {
  const maybeWindow: unknown = { self: null, window: null };

  (maybeWindow as { window: unknown }).window = maybeWindow;
  (maybeWindow as { self: unknown }).self = maybeWindow;

  if (isWindow(maybeWindow)) {
    const definitelyWindow: Window = maybeWindow;

    assertStrictEquals(typeof definitelyWindow, "object");
  }
});

Deno.test("isWindow() throws on invalid number of arguments", () => {
  // @ts-expect-error - missing argument
  assertThrows(() => isWindow(), TypeError);

  // @ts-expect-error - too many arguments
  assertThrows(() => isWindow({}, {}), TypeError);
});
