/**
 * Utility module for checking whether a value is a promise.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of promise
 * values. This does not match generic thenables or custom awaitables.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_promise
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a promise.
 *
 * @example
 * isPromise(Promise.resolve()); // true
 * isPromise(new Promise(() => {})); // true
 * isPromise({ then() {} }); // false
 *
 * @name lang/is_promise.isPromise
 * @param {unknown}value - The value to check.
 * @returns {value is Promise<unknown>} Whether the value is a promise.
 * @see {@link lang/type_of.typeOf}
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return boundTypeOf(arguments) === "promise";
}

unsetPrototype(isPromise);
