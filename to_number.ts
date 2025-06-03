/**
 * Utility module for converting a value into a number.
 *
 * Normalizes common edge cases and avoids pitfalls of JavaScript's `Number()`
 * casting, such as converting `[4]` to `4` or `"123abc"` to `123`.
 *
 * Falsy values like `null`, `undefined`, `false`, and empty strings return `0`.
 * Arrays and unsupported types return `NaN`. Strings are parsed using
 * `parseFloat`, with optional strict mode for exact numeric syntax.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_number
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/toNumber.js|mout@1.2.4/lang/toNumber}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import { isNumberLike } from "./is_numeric.ts";
import { getType } from "./type_of.ts";

const { isNaN } = Number;

/**
 * Internal implementation of {@link toNumber}.
 *
 * @name lang/to_number~numberFrom
 */
export const numberFrom = (value: unknown, strict = false): number => {
  if (strict) return isNumberLike(value) ? Number(value) : NaN;

  if (value === true) return 1;

  if (value === false || value === "" || value == null) return 0;

  const type = getType(value);

  if (type === "number") return value as number;

  if (type === "string") {
    const str = (value as string).trim();

    if (str === "") return 0;

    const parsed = parseFloat(str);

    return isNaN(parsed) ? NaN : parsed;
  }

  if (type === "array" || type === "bigint" || type === "symbol") return NaN;

  return Number(value);
};

/**
 * Converts a value into a number.
 *
 * @example
 * toNumber("123"); // 123
 * toNumber("123abc"); // 123
 * toNumber("123abc", true); // NaN
 * toNumber([4]); // NaN
 * toNumber(null); // 0
 *
 * @name lang/to_number.toNumber
 * @param {unknown} value - The value to convert.
 * @param {boolean} [strict=false] - Whether only fully valid numbers are accepted.
 * @returns {number} The resulting number or `NaN` if conversion is not safe.
 * @see {@link lang/is_numeric.isNumeric}
 */
export function toNumber(value: unknown, strict = false): number {
  validateArgsLength(arguments, 1, 2);

  return numberFrom(value, strict);
}

unsetPrototype(toNumber);
