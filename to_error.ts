/**
 * Utility module for converting a value into an `Error` object.
 *
 * Converts unknown input into a proper `Error` object. Supports primitive
 * values, error-like objects, and native `Error` instances.
 *
 * In strict mode, non-error input is wrapped with descriptive fallback
 * messages. Symbols are not supported and throw a `TypeError`.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_error
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import { getType } from "./type_of.ts";

/**
 * Converts a value into an `Error` object.
 *
 * @example
 * toError(new Error("fail")); // Error: fail
 * toError("fail"); // Error: fail
 * toError({ message: "fail" }); // Error: fail
 * toError(Symbol()); // throws TypeError
 *
 * @name lang/to_error.toError
 * @param {unknown} value - The value to convert.
 * @param {boolean} [strict=false] - Whether to enforce descriptive fallback messages.
 * @returns {Error} The resulting `Error` object.
 */

export function toError(value: unknown, strict = false): Error {
  validateArgsLength(arguments, 1, 2);

  const type = getType(value);

  if (type === "error") return value as Error;

  if (type === "symbol") throw new TypeError("Invalid argument 'value': cannot convert symbol to error");

  if (type !== "object") {
    if (strict) return new Error(`Error coerced from ${type}`);

    if (type === "string" || type === "number" || type === "bigint") return new Error(value as string);

    return new Error();
  }

  const { message, cause } = value as Record<string, unknown>;

  const msg = getType(message) === "string"
    ? message as string
    : strict
    ? "Error coerced from non-error object"
    : undefined;

  return cause != null ? new Error(msg, { cause }) : new Error(msg);
}

unsetPrototype(toError);
