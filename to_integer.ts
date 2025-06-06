/**
 * Provides a safe and consistent way to convert values into integers.
 *
 * Converts primitives, nullish values, and other common inputs into lower-bound
 * integers using a combination of type-aware coercion and `Math.floor()`.
 * Strings with numeric content are parsed, boolean `true` becomes `1`, and
 * falsy values like `false`, `null`, or `""` become `0`.
 *
 * A strict mode is available to disable lossy coercion and enforce exact
 * numeric syntax. Invalid or non-numeric input results in `NaN`.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_integer
 */

import { unsetPrototype, validateArgsLength, validatePlainObjArg, validateStrictOpt } from "./internal/mod.ts";
import { numberFrom, type ToNumberOptions } from "./to_number.ts";

const { floor } = Math;

/**
 * Represents a configuration options object.
 *
 * Used to configure how values are converted in {@link toInteger}.
 *
 * @name lang/to_integer.ToIntegerOptions
 * @property {boolean} [strict=false] - Whether to enforce exact numeric syntax.
 * @see {@link lang/to_number.ToNumberOptions}
 */
export interface ToIntegerOptions extends ToNumberOptions {}

/**
 * Local helper to validate and normalize options for {@link toInteger}.
 */
const getValidatedOptions = (optionalOptions?: ToIntegerOptions): Required<ToIntegerOptions> => {
  const options = optionalOptions == null ? {} : optionalOptions;

  validatePlainObjArg("options", options);

  return { strict: validateStrictOpt(options.strict) };
};

/**
 * Converts a value into an integer.
 *
 * @example
 * toInteger("42.9"); // 42
 * toInteger("10.1", { strict: true }); // 10
 * toInteger(null); // 0
 * toInteger([4]); // NaN
 *
 * @name lang/to_integer.toInteger
 * @param {unknown} value - The value to convert.
 * @param {ToIntegerOptions} [options] - An optional configuration object.
 * @returns {number} The resulting integer, or `NaN` if conversion isn't safe.
 * @see {@link lang/to_number.toNumber}
 */
export function toInteger(value: unknown, options?: ToIntegerOptions): number {
  validateArgsLength(arguments, 1, 2);

  return floor(numberFrom(value, getValidatedOptions(options)));
}

unsetPrototype(toInteger);
