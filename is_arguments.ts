/**
 * Utility module for checking whether a value is an arguments list.
 *
 * This implementation detects the special `arguments` object available inside
 * functions. These are array-like but not real arrays - they lack array
 * methods, but have a `length` and indexed elements.
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

/* eslint-disable jsdoc/check-template-names, jsdoc/require-template */

/**
 * Represents an array-like `arguments` list.
 *
 * Used as type predicate by {@link isArguments}.
 *
 * @name lang/is_arguments.Arguments
 * @template [Argument=unknown] - The type of each argument in the arguments list, defaulting to `unknown`.
 */
export type Arguments<Argument = unknown> = ArrayLike<Argument>;

/* eslint-enable jsdoc/check-template-names, jsdoc/require-template */

/**
 * Checks whether a value is an arguments list.
 *
 * @example
 * (function () {
 *   isArguments(arguments); // true
 * })();
 * isArguments([]); // false
 * isArguments({ length: 2 }); // false
 *
 * @name lang/is_arguments.isArguments
 * @param {unknown} value - The value to check.
 * @returns {value is Arguments} Whether the value is an `arguments` list.
 * @see {@link lang/type_of.typeOf}
 */
export function isArguments(value: unknown): value is Arguments {
  return boundTypeOf(arguments) === "arguments";
}

unsetPrototype(isArguments);
