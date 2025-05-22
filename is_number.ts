/**
 * Utility module for checking whether a value is a number.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of numeric
 * values, including wrapped numbers (e.g. `new Number(42)`).
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_number
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isNumber.js|mout@1.2.4/lang/isNumber}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a number.
 *
 * @example
 * isNumber(42); // true
 * isNumber(NaN); // true
 * isNumber(new Number(123)); // true
 * isNumber("123"); // false
 *
 * @name lang/is_number.isNumber
 * @param {unknown} _value - The value to check.
 * @returns {_value is number} Whether the value is a number.
 * @see {@link lang/type_of.typeOf}
 */
export function isNumber(_value: unknown): _value is number {
  return boundTypeOf(arguments) === "number";
}

unsetPrototype(isNumber);
