/**
 * Utility module for converting a value into an integer.
 *
 * This implementation behaves like {@link lang/to_number.toNumber}, but
 * applies `Math.floor()` to return the nearest lower whole number.
 *
 * Falsy values like `null`, `false` or `""` become `0`. Non-numeric input
 * results in `NaN`.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_integer
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import { numberFrom } from "./to_number.ts";

const { floor } = Math;

/**
 * Converts a value into an integer.
 *
 * @example
 * toInteger("42.9"); // 42
 * toInteger("10.1", true); // 10
 * toInteger(null); // 0
 * toInteger([4]); // NaN
 *
 * @name lang/to_integer.toInteger
 * @param {unknown} value - The value to convert.
 * @param {boolean} [strict=false] - Whether only fully valid numbers are accepted.
 * @returns {number} The resulting integer or `NaN` if conversion is not safe.
 * @see {@link lang/to_number.toNumber}
 */
export function toInteger(value: unknown, strict = false): number {
  validateArgsLength(arguments, 1, 2);

  return floor(numberFrom(value, strict));
}

unsetPrototype(toInteger);
