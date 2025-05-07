/**
 * Utility module for checking whether a value is an array.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_array
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isArray.js|mout@1.2.4/lang/isArray}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";

/**
 * Internal impementation of {@link isArray}.
 *
 * @name lang/is_array~nativeIsArray
 */
export const { isArray: nativeIsArray } = Array;

/**
 * Checks whether a value is an array.
 *
 * @name lang/is_array.isArray
 * @param {unknown} value - The value to check.
 * @returns {value is unknown[]} Whether the value is an array.
 */
export function isArray(
  value: unknown,
): value is unknown[] {
  validateArgsLength(arguments);

  return nativeIsArray(value);
}

unsetPrototype(isArray);
