/**
 * Utility module for checking whether a value is a big integer.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of big integer
 * values, including wrapped ones (e.g. `Object(42n)`).
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_bigint
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a big integer.
 *
 * @example
 * isBigInt(42n); // true
 * isBigInt(Object(42n)); // true
 * isBigInt(BigInt("123")); // true
 * isBigInt(42); // false
 *
 * @name lang/is_bigint.isBigInt
 * @param {unknown} value - The value to check.
 * @returns {value is bigint} Whether the value is a big integer.
 * @see {@link lang/type_of.typeOf}
 */
export function isBigInt(value: unknown): value is bigint {
  return boundTypeOf(arguments) === "bigint";
}

unsetPrototype(isBigInt);
