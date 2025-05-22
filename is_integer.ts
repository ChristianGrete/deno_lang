/**
 * Utility module for checking whether a value is an integer.
 *
 * Accepts both primitive numbers and `Number` objects. Uses type check and
 * `Number.isInteger()` for safe detection.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_integer
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isInteger.js|mout@1.2.4/lang/isInteger}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Internal implementation of {@link isInteger}.
 *
 * @name lang/is_integer~nativeIsInteger
 */
export const { isInteger: nativeIsInteger } = Number;

/**
 * Checks whether a value is an integer number.
 *
 * Accepts both primitive numbers and `Number` objects.
 *
 * @example
 * isInteger(42); // true
 * isInteger(new Number(3)); // true
 * isInteger(3.14); // false
 * isInteger("42"); // false
 *
 * @name lang/is_integer.isInteger
 * @param {unknown} value - The value to check.
 * @returns {value is number} Whether the value is an integer.
 */
export function isInteger(value: unknown): value is number {
  if (boundTypeOf(arguments) !== "number") return false;

  const number = typeof value === "number" ? value : (value as number).valueOf();

  return nativeIsInteger(number);
}

unsetPrototype(isInteger);
