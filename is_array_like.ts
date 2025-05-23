/**
 * Utility module for checking whether a value is array-like.
 *
 * An array-like value is any non-function, non-global object with a finite
 * non-negative integer `.length` and corresponding index access. This includes
 * arrays, strings, `arguments`, `NodeList` objects, and similar structures.
 *
 * This implementation follows jQuery's heuristics, including a check for the
 * existence of the last indexed element to filter out objects that only pretend
 * to be array-like.
 *
 * @author Richard Gibson <richard.gibson@gmail.com>
 * @author Rick Waldron <waldron.rick@gmail.com>
 * @author Timmy Willison <4timmywil@gmail.com>
 * @author Thomas Tortorini <thomastortorini@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_array_like
 * @see {@link https://github.com/jquery/jquery/blob/3.7.1/src/core.js#L424|jquery@3.7.1/core.isArrayLike}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import { nativeIsArray } from "./is_array.ts";

/**
 * Internal implementation of {@link isArrayLike}.
 *
 * @name lang/is_array_like~hasArrayLikeShape
 */
export const hasArrayLikeShape = (value: unknown): boolean => {
  if (nativeIsArray(value)) return true;

  if (value == null || typeof value === "function" || value === globalThis) return false;

  const { length } = value as { length?: unknown };

  return typeof length === "number" && length >= 0 && (length === 0 || (length - 1) in Object(value));
};

/**
 * Checks whether a value is array-like (e.g. has a numeric `.length` and index
 * access).
 *
 * @example
 * isArrayLike([]); // true
 * isArrayLike("hi"); // true
 * isArrayLike({ 0: "a", 1: "b", length: 2 }); // true
 * isArrayLike(() => {}); // false
 *
 * @name lang/is_array_like.isArrayLike
 * @param {unknown} value - The value to check.
 * @returns {value is ArrayLike<unknown>} Whether the value is array-like.
 */
export function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  validateArgsLength(arguments);

  return hasArrayLikeShape(value);
}

unsetPrototype(isArrayLike);
