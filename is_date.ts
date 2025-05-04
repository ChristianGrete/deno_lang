/**
 * Utility module for checking whether a value is a date object.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_date
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isDate.js|mout@1.2.4/lang/isDate}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a date object.
 *
 * @function
 * @name lang/is_date.isDate
 * @param {unknown} _value - The value to check.
 * @returns {_value is Date} Whether the value is a `Date` object.
 * @see {@link lang/type_of.typeOf}
 */
export function isDate(
  _value: unknown,
): _value is Date {
  return boundTypeOf(arguments) === "date";
}

unsetPrototype(isDate);
