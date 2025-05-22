/**
 * Utility module for checking whether two values are not the same value.
 *
 * This negates the SameValue comparison from {@link lang/is.is}, distinguishing
 * cases like `0 !== -0` and treating `NaN` as equal to itself.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/isnt
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isnt.js|mout@1.2.4/lang/isnt}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import { nativeIs } from "./is.ts";

/**
 * Checks whether two values are not the same value.
 *
 * @example
 * isnt(42, 43); // true
 * isnt(0, -0); // true
 * isnt(NaN, NaN); // false
 *
 * @name lang/isnt.isnt
 * @param {unknown} x - First value to compare.
 * @param {unknown} y - Second value to compare.
 * @returns {boolean} Whether the values are not the same.
 * @see {@link lang/is.is}
 */
export function isnt(x: unknown, y: unknown): boolean {
  validateArgsLength(arguments, 2);

  return !nativeIs(x, y);
}

unsetPrototype(isnt);
