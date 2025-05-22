/**
 * Utility module for checking whether a value is a string.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of string
 * values, including wrapped strings (e.g. `new String("hello")`).
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_string
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isString.js|mout@1.2.4/lang/isString}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a string.
 *
 * @example
 * isString("hello"); // true
 * isString(new String("hello")); // true
 * isString(123); // false
 *
 * @name lang/is_string.isString
 * @param {unknown} _value - The value to check.
 * @returns {_value is string} Whether the value is a string.
 * @see {@link lang/type_of.typeOf}
 */
export function isString(_value: unknown): _value is string {
  return boundTypeOf(arguments) === "string";
}

unsetPrototype(isString);
