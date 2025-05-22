/**
 * Utility module for checking whether a value is the special `NaN` value.
 *
 * Unlike the global `isNaN()`, this does not coerce the input and only
 * returns `true` for the exact `NaN` value of type number or a wrapped
 * `Number` instance whose inner value is `NaN`.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_nan
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isNaN.js|mout@1.2.4/lang/isNaN}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is exactly the `NaN` value.
 *
 * Unlike the global `isNaN()`, this does not coerce the input and only returns
 * true for the special `NaN` value of type number.
 *
 * @example
 * isNaN(NaN); // true
 * isNaN(new Number(NaN)); // true
 * isNaN("NaN"); // false
 * isNaN("foo"); // false
 * isNaN(undefined); // false
 *
 * @name lang/is_nan.isNaN
 * @param {unknown} value - The value to check.
 * @returns {value is number} Whether the value is `NaN`.
 */
export function isNaN(value: unknown): value is number {
  if (boundTypeOf(arguments) !== "number") return false;

  const number = typeof value === "number" ? value : (value as number).valueOf();

  return Number.isNaN(number);
}

unsetPrototype(isNaN);
