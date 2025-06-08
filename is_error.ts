/**
 * Utility module for checking whether a value is an error object.
 *
 * Detects both generic `Error` instances and extended error types like
 * `TypeError`, `SyntaxError` or custom error subclasses. This does not include
 * error-like objects or string-based error messages.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_error
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is an error object.
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
 * @param {unknown} value - The value to check.
 * @returns {value is Error} Whether the value is an error object.
 * @see {@link lang/type_of.typeOf}
 */
export function isError(value: unknown): value is Error {
  return boundTypeOf(arguments) === "error";
}

unsetPrototype(isError);
