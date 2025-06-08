/**
 * Utility module for checking whether a value is a set.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of `Set`
 * objects, including subclasses and wrapped instances.
 *
 * This function does not match arrays, plain objects, or set-like structures.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_set
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a set.
 *
 * @example
 * isSet(new Set()); // true
 * isSet(Object(new Set())); // true
 * isSet(new WeakSet()); // false
 * isSet([]); // false
 *
 * @name lang/is_set.isSet
 * @param {unknown} value - The value to check.
 * @returns {value is Set<unknown>} Whether the value is a set.
 * @see {@link lang/type_of.typeOf}
 */
export function isSet(value: unknown): value is Set<unknown> {
  return boundTypeOf(arguments) === "set";
}

unsetPrototype(isSet);
