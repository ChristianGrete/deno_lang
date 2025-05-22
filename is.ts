/**
 * Utility module for checking whether two values are the same value.
 *
 * This uses the SameValue comparison algorithm, which differs from `===` in
 * its handling of `NaN`, `0` and `-0`. Internally, this is a direct wrapper
 * around the native `Object.is` method.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/is.js|mout@1.2.4/lang/is}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";

/**
 * Internal implementation of {@link is}.
 *
 * @name lang/is~nativeIs
 */
export const { is: nativeIs } = Object;

/**
 * Checks whether two values are the same value.
 *
 * @example
 * is(NaN, NaN); // true
 * is(0, -0); // false
 * is("foo", "foo"); // true
 *
 * @name lang/is.is
 * @param {unknown} x - First value to compare.
 * @param {unknown} y - Second value to compare.
 * @returns {boolean} Whether the two values are the same.
 */
export function is(x: unknown, y: unknown): boolean {
  validateArgsLength(arguments, 2);

  return nativeIs(x, y);
}

unsetPrototype(is);
