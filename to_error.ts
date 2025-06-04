/**
 * Utility module for converting a value into an error object.
 *
 * Converts unknown input into a proper `Error` object. Supports primitive
 * values, error-like objects, and native error instances.
 *
 * In strict mode, non-error input is wrapped with descriptive fallback
 * messages. Symbols are not supported and throw a `TypeError`. The optional
 * `options` object accepts only valid values and silently falls back to safe
 * defaults for unknown or invalid types.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_error
 */

import { unsetPrototype, validateArgsLength, validatePlainObjArg, validateStrictOpt } from "./internal/mod.ts";
import { getType } from "./type_of.ts";

/**
 * Represents the native `Error` constructor and its subclasses.
 *
 * Mimics the built-in `ErrorConstructor`, but allows returning a specific error
 * type like `TypeError` or `RangeError` while retaining static members.
 *
 * Used as return type by {@link toError}.
 *
 * @name lang/to_error.ErrorConstructorOf
 * @template ErrorInstance - The error object to be created.
 */
export interface ErrorConstructorOf<ErrorInstance extends Error> extends Omit<ErrorConstructor, "new"> {
  new (message?: string, options?: ErrorOptions): ErrorInstance; // eslint-disable-line unused-imports/no-unused-vars
}

/**
 * Represents a configuration options object.
 *
 * Used to configure how values are converted in {@link toError}.
 *
 * @name lang/to_error.ToErrorOptions
 * @property {ErrorConstructorOf<ErrorInstance>} [errorConstructor=Error] - An optional error constructor to use (e.g. `TypeError`).
 * @property {boolean} [strict=false] - Whether to enforce descriptive fallback messages.
 * @template ErrorInstance - The error object to be created.
 */
export interface ToErrorOptions<ErrorInstance extends Error> {
  /**
   * Optional error constructor to use (e.g. `TypeError` or `RangeError`).
   *
   * @default Error
   */
  errorConstructor?: ErrorConstructorOf<ErrorInstance>;
  /**
   * Optional flag to enforce descriptive fallback messages.
   *
   * @default false
   */
  strict?: boolean;
}

/**
 * Local helper to validate and normalize options for {@link toError}.
 */
const getValidatedOptions = <ErrorInstance extends Error>(
  optionalOptions?: ToErrorOptions<ErrorInstance>,
): Required<ToErrorOptions<Error | ErrorInstance>> => {
  const options = optionalOptions == null ? {} : optionalOptions;

  validatePlainObjArg("options", options);

  const { strict, errorConstructor } = options;
  const ErrorCtor =
    getType(errorConstructor) === "function" && errorConstructor?.prototype != null &&
      errorConstructor.prototype instanceof Error
      ? errorConstructor
      : Error;

  return { errorConstructor: ErrorCtor, strict: validateStrictOpt(strict) };
};

/* eslint-disable jsdoc/check-template-names, jsdoc/require-template */

/**
 * Converts a value into an error object.
 *
 * @example
 * toError(new Error("fail")); // Error: fail
 * toError("fail"); // Error: fail
 * toError({ message: "fail" }); // Error: fail
 * toError(Symbol()); // throws TypeError
 * toError("fail", { strict: true }); // Error: Error coerced from string
 * toError<TypeError>("invalid", { errorConstructor: TypeError }); // TypeError: invalid
 *
 * @name lang/to_error.toError
 * @param {unknown} value - The value to convert.
 * @param {ToErrorOptions<ErrorInstance>} [options] - An optional configuration object.
 * @returns {ErrorInstance} The resulting error object.
 * @see {@link ToErrorOptions}
 * @template [ErrorInstance=Error] - An optional type of error object returned.
 * @throws {TypeError} If `value` is a symbol (not supported by error constructors).
 */
export function toError<ErrorInstance extends Error = Error>(
  value: unknown,
  options?: ToErrorOptions<ErrorInstance>,
): ErrorInstance {
  validateArgsLength(arguments, 1, 2);

  const { errorConstructor: ErrorCtor, strict } = getValidatedOptions<ErrorInstance>(options);
  const type = getType(value);

  if (type === "error") return value as ErrorInstance;

  if (type === "symbol") throw new TypeError("Invalid argument 'value': cannot convert symbol to error");

  if (type !== "object") {
    if (strict) return new ErrorCtor(`Error coerced from ${type}`) as ErrorInstance;

    if (type === "string" || type === "number" || type === "bigint") {
      return new ErrorCtor(value as string) as ErrorInstance;
    }

    return new ErrorCtor() as ErrorInstance;
  }

  const { message, cause } = value as Record<string, unknown>;

  const msg = getType(message) === "string"
    ? message as string
    : strict
    ? "Error coerced from non-error object"
    : undefined;

  return (cause != null ? new ErrorCtor(msg, { cause }) : new ErrorCtor(msg)) as ErrorInstance;
}

/* eslint-enable jsdoc/check-template-names, jsdoc/require-template */

unsetPrototype(toError);
