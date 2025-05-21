/**
 * Utility module for checking whether a value is a finite number.
 *
 * This combines `Object.prototype.toString` with `Number.isFinite`, making it
 * safer than the global `isFinite`.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_finite
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isFinite.js|mout@1.2.4/lang/isFinite}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a finite number.
 *
 * @example
 * isFinite(42); // true
 * isFinite(-3.14); // true
 * isFinite(Infinity); // false
 * isFinite(NaN); // false
 * isFinite("42"); // false
 *
 * @name lang/is_finite.isFinite
 * @param {unknown} value - The value to check.
 * @returns {value is number} Whether the value is a finite number.
 */
export function isFinite(value: unknown): value is number {
  return boundTypeOf(arguments) === "number" && Number.isFinite(value);
}

unsetPrototype(isFinite);
