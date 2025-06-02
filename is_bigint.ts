/**
 * Utility module for checking whether a value is a big integer.
 *
 * Accepts both primitive big integer values and boxed `BigInt` objects. Uses
 * internal type checking to reliably detect both.
 *
 * Big integers are values created using the `BigInt()` function, such as `123n`.
 * Note that `new BigInt()` is not allowed in JavaScript, but `Object(123n)` is.
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
 * @param {unknown} _value - The value to check.
 * @returns {_value is bigint} Whether the value is a `bigint`.
 * @see {@link lang/type_of.typeOf}
 */
export function isBigInt(_value: unknown): _value is bigint {
  return boundTypeOf(arguments) === "bigint";
}

unsetPrototype(isBigInt);
