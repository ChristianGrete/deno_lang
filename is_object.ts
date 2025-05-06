/**
 * Utility module for checking whether a value is an object.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_object
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isObject.js|mout@1.2.4/lang/isObject}
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isObject.js|mout-lang-type@0.6.0/lang/isObject}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Represents any non-null object with string, number, or symbol keys.
 *
 * @name lang/is_object.Obj
 */
export type Obj = Record<PropertyKey, unknown>;

/**
 * Checks whether a value is an object.
 *
 * @function
 * @name lang/is_object.isObject
 * @param {unknown} _value - The value to check.
 * @returns {_value is Obj} Whether the value is an object.
 * @see {@link lang/type_of.typeOf}
 */
export function isObject(
  _value: unknown,
): _value is Obj {
  return boundTypeOf(arguments) === "object";
}

unsetPrototype(isObject);
