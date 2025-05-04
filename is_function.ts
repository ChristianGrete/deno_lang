/**
 * Utility module for checking whether a value is a function.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_function
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isFunction.js|mout@1.2.4/lang/isFunction}
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isFunction.js|mout-lang-type@0.6.0/lang/isFunction}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * A function with any arguments and return type.
 *
 * Used as the return type by {@link isFunction}.
 *
 * @name lang/is_function.Func
 */
export type Func = (...args: unknown[]) => unknown;

/**
 * Checks whether a value is a function.
 *
 * @function
 * @name lang/is_function.isFunction
 * @param {unknown} _value - The value to check.
 * @returns {_value is Func} Whether the value is a function.
 * @see {@link lang/type_of.typeOf}
 */
export function isFunction(
  _value: unknown,
): _value is Func {
  return boundTypeOf(arguments) === "function";
}

unsetPrototype(isFunction);
