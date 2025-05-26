/**
 * Utility module for checking whether a value is a window object.
 *
 * This implementation follows jQuery's historical behavior, where a `window`
 * is detected by checking for a self-reference via `.window` and `.self`.
 *
 * @author John Resig <jeresig@gmail.com>
 * @author Rafaël Blais Masson <rafbmasson@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_window
 * @see {@link https://github.com/jquery/jquery/blob/3.7.1/src/var/isWindow.js|jquery@3.7.1/var.isWindow}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";

/**
 * Internal implementation of {@link isWindow}.
 *
 * @name lang/is_window~hasWindowLikeShape
 */
export const hasWindowLikeShape = (
  value: unknown,
): boolean => (typeof value === "object" &&
  value !== null &&
  (value as { window?: unknown }).window === value &&
  (value as { self?: unknown }).self === value);

/* eslint-disable jsdoc/no-undefined-types */

/**
 * Checks whether a value is a `window` object.
 *
 * @example
 * isWindow(window); // true
 * isWindow(globalThis); // true (in browser)
 * isWindow({ window: {} }); // false
 *
 * @name lang/is_window.isWindow
 * @param {unknown} value - The value to check.
 * @returns {value is Window} Whether the value is a window object.
 */
export function isWindow(value: unknown): value is Window {
  validateArgsLength(arguments);

  return hasWindowLikeShape(value);
}

/* eslint-enable jsdoc/no-undefined-types */

unsetPrototype(isWindow);
