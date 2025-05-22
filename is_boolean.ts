/**
 * Utility module for checking whether a value is a boolean.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of boolean
 * values, including wrapped booleans (e.g. `new Boolean(true)`).
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_boolean
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isBoolean.js|mout@1.2.4/lang/isBoolean}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a boolean.
 *
 * @example
 * isBoolean(true); // true
 * isBoolean(false); // true
 * isBoolean("true"); // false
 * isBoolean(0); // false
 *
 * @name lang/is_boolean.isBoolean
 * @param {unknown} _value - The value to check.
 * @returns {_value is boolean} Whether the value is a boolean.
 * @see {@link lang/type_of.typeOf}
 */
export function isBoolean(_value: unknown): _value is boolean {
  return boundTypeOf(arguments) === "boolean";
}

unsetPrototype(isBoolean);
