/**
 * Utility module for checking whether a value is exactly `null`.
 *
 * Unlike some loosely typed comparisons (`== null`), this function only
 * returns `true` for the literal `null` value.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_null
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isNull.js|mout@1.2.4/lang/isNull}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";

/**
 * Checks whether a value is `null`.
 *
 * @example
 * isNull(null); // true
 * isNull(undefined); // false
 * isNull(0); // false
 * isNull(""); // false
 *
 * @name lang/is_null.isNull
 * @param {unknown} value - The value to check.
 * @returns {value is null} Whether the value is `null`.
 */
export function isNull(value: unknown): value is null {
  validateArgsLength(arguments);

  return value === null;
}

unsetPrototype(isNull);
