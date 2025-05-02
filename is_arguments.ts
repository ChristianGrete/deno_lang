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

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";
import { typeOf } from "./type_of.ts";

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
 * @param {unknown} value – The value to check.
 * @returns {value is Arguments} Whether the value is an `arguments` list.
 * @see {@link lang/type_of.typeOf}
 */
export function isArguments(value: unknown): value is Arguments {
  validateArgsLength(arguments);

  return typeOf(value) === "arguments";
}

unsetPrototype(isArguments);
