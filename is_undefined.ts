/**
 * Utility module for checking whether a value is exactly `undefined`.
 *
 * Unlike some loosely typed comparisons (`== undefined`), this function only
 * returns `true` for the literal `undefined` value.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_undefined
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isUndefined.js|mout@1.2.4/lang/isUndefined}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";

/**
 * Checks whether a value is exactly `undefined`.
 *
 * @example
 * isUndefined(undefined); // true
 * isUndefined(null); // false
 * isUndefined(0); // false
 *
 * @name lang/is_undefined.isUndefined
 * @param {unknown} value - The value to check.
 * @returns {value is undefined} Whether the value is `undefined`.
 */
export function isUndefined(value: unknown): value is undefined {
  validateArgsLength(arguments);

  return value === undefined;
}

unsetPrototype(isUndefined);
