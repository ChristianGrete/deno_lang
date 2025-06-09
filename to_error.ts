/**
 * Provides a safe and type-aware way to coerce any value into an error object.
 *
 * Coerces primitives, plain objects, and error objects into usable error
 * instances.
 *
 * A configuration object can be used to select a custom error constructor,
 * allowing the use of specific error types like `TypeError`, `RangeError`, or
 * others.
 *
 * A strict mode is also available to enforce descriptive fallback messages
 * instead of generic or empty ones when input values are non-standard.
 *
 * Symbols are passed through to the constructor and may result in a
 * `TypeError`, depending on how it handles symbol input.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_error
 */

import { unsetPrototype, validateArgsLength, validatePlainObjArg, validateStrictOpt } from "./internal/mod.ts";
import { getType } from "./type_of.ts";

// deno-lint-ignore no-explicit-any
type ErrorConstructorOf<ErrorInstance extends Error> = new (...args: any) => ErrorInstance;

/**
 * Represents a configuration options object.
 *
 * Used to configure how values are converted in {@link toError}.
 *
 * @name lang/to_error.ToErrorOptions
 * @property {ErrorConstructorOf<ErrorInstance>} [errorConstructor=Error] - The constructor to create the error, defaulting to `Error`.
 * @property {boolean} [strict=false] - Whether to enforce descriptive fallback messages.
 * @template {Error} ErrorInstance - The error type to be returned.
 */
export interface ToErrorOptions<ErrorInstance extends Error> {
  /**
   * The constructor to create the error.
   *
   * @default Error
   */
  errorConstructor?: ErrorConstructorOf<ErrorInstance>;
  /**
   * Whether to enforce descriptive fallback messages.
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

  return { errorConstructor: ErrorCtor, strict: validateStrictOpt(strict) } satisfies Required<
    ToErrorOptions<Error | ErrorInstance>
  >;
};

/* eslint-disable jsdoc/check-template-names, jsdoc/require-template */

/**
 * Converts a value into an error object.
 *
 * @example
 * toError(new Error("fail")); // Error: fail
 * toError("fail"); // Error: fail
 * toError({ cause: { exitCode: 1 }, message: "fail" }); // Error: fail
 * toError("fail", { strict: true }); // Error: Error coerced from string
 * toError<TypeError>("invalid", { errorConstructor: TypeError }); // TypeError: invalid
 *
 * @name lang/to_error.toError
 * @param {unknown} value - The value to convert.
 * @param {ToErrorOptions<ErrorInstance>} [options] - An optional configuration object.
 * @returns {ErrorInstance} The resulting error object.
 * @see {@link ToErrorOptions}
 * @template {Error} [ErrorInstance=Error] - The error type to return, defaulting to `Error`.
 * @throws {TypeError} When `value` is a symbol and the error constructor cannot handle it.
 */
export function toError<ErrorInstance extends Error = Error>(
  value: unknown,
  options?: ToErrorOptions<ErrorInstance>,
): ErrorInstance {
  validateArgsLength(arguments, 1, 2);

  const { errorConstructor: ErrorCtor, strict } = getValidatedOptions<ErrorInstance>(options);
  const type = getType(value);

  if (type === "error") return value as ErrorInstance;

  if (type !== "object") {
    if (strict) return new ErrorCtor(`Error coerced from ${type}`) as ErrorInstance;

    if (type === "string" || type === "number" || type === "bigint" || type === "symbol") {
      return new ErrorCtor(value) as ErrorInstance;
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
