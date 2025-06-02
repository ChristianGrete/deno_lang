/**
 * Utility module for checking whether a value is a floating-point number.
 *
 * A "float" is defined here as a finite number with a non-zero fractional part.
 * This includes both primitive numbers and `Number` objects.
 *
 * Values like `NaN` and `Infinity` are not considered floats by this
 * implementation.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_float
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";
import { nativeIsFinite } from "./is_finite.ts";

const { floor } = Math;

/**
 * Checks whether a value is a floating-point number.
 *
 * A float is a finite number with a non-zero fractional part.
 *
 * @example
 * isFloat(3.14); // true
 * isFloat(new Number(2.71)); // true
 * isFloat(42); // false
 * isFloat("3.14"); // false
 * isFloat(NaN); // false
 * isFloat(Infinity); // false
 *
 * @name lang/is_float.isFloat
 * @param {unknown} value - The value to check.
 * @returns {value is number} Whether the value is a float.
 */
export function isFloat(value: unknown): value is number {
  if (boundTypeOf(arguments) !== "number") return false;

  const number = typeof value === "number" ? value : (value as number).valueOf();

  return nativeIsFinite(number) && floor(number) !== number;
}

unsetPrototype(isFloat);
