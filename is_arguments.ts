/**
 * Utility module for checking whether a value is an arguments list.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_arguments
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isArguments.js|mout@1.2.4/lang/isArguments}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Represents an array-like `arguments` list.
 *
 * @name lang/is_arguments.Arguments
 */
export type Arguments = ArrayLike<unknown>;

/**
 * Checks whether a value is an arguments list.
 *
 * @function
 * @name lang/is_arguments.isArguments
 * @param {unknown} _value – The value to check.
 * @returns {_value is Arguments} Whether the value is an `arguments` list.
 * @see {@link lang/type_of.typeOf}
 */
export function isArguments(_value: unknown): _value is Arguments {
  return boundTypeOf(arguments) === "arguments";
}

unsetPrototype(isArguments);
