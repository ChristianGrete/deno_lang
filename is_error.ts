/**
 * Utility module for checking whether a value is an error object.
 *
 * Accepts both plain `Error` instances and extended error types like
 * `TypeError`, `SyntaxError`, etc. Uses internal type checking to reliably
 * detect them.
 *
 * Note that string-based error messages or primitives are not considered errors
 * by this function.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_error
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is an error.
 *
 * This includes all standard error types and custom subclasses of `Error`.
 *
 * @example
 * isError(new Error("oops")); // true
 * isError(new TypeError("fail")); // true
 * isError("oops"); // false
 * isError({ message: "fail", name: "Error" }); // false
 *
 * @name lang/is_error.isError
 * @param {unknown} _value - The value to check.
 * @returns {_value is Error} Whether the value is an error object.
 * @see {@link lang/type_of.typeOf}
 */
export function isError(_value: unknown): _value is Error {
  return boundTypeOf(arguments) === "error";
}

unsetPrototype(isError);
