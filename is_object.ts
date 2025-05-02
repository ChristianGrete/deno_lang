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

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";
import { typeOf } from "./type_of.ts";

/**
 * Represents any non-null object with string, number, or symbol keys.
 *
 * @name lang/is_object.Obj
 */
export type Obj = Record<string | symbol | number, unknown>;

/**
 * Checks whether a value is an object.
 *
 * @function
 * @name lang/is_object.isObject
 * @param {unknown} value – The value to check.
 * @returns {value is Obj} Whether the value is an object.
 * @see {@link lang/type_of.typeOf}
 */
export function isObject(
  value: unknown,
): value is Obj {
  validateArgsLength(arguments);

  return typeOf(value) === "object";
}

unsetPrototype(isObject);
