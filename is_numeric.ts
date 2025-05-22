/**
 * Utility module for checking whether a value is numeric (i.e. a finite
 * number or a string that can be coerced to a finite number).
 *
 * This function behaves similarly to `jQuery.isNumeric` in version 3.x,
 * returning `true` for values like `"42"`, `"0xFF"`, or `8e5`, and `false`
 * for `NaN`, `Infinity`, or strings that cannot be parsed to numbers.
 *
 * @author Dave Methvin <dave.methvin@gmail.com>
 * @author Timmy Willison <4timmywil@gmail.com>
 * @author Steve Mao <maochenyan@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_numeric
 * @see {@link https://github.com/jquery/jquery/blob/3.2.1/src/core.js#L222|jquery@3.2.1/core.isNumeric}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

const { isFinite } = Number;

/**
 * Represents a finite number or a string that can be coerced to one.
 *
 * Used as type predicate by {@link isNumeric}.
 *
 * @name lang/is_numeric.Numeric
 */
export type Numeric = number | string;

/**
 * Checks whether a value is numeric (i.e. a finite number or a string that
 * can be coerced to one).
 *
 * @example
 * isNumeric(42); // true
 * isNumeric("3.14"); // true
 * isNumeric("0xFF"); // true
 * isNumeric(NaN); // false
 * isNumeric("foo"); // false
 *
 * @name lang/is_numeric.isNumeric
 * @param {unknown} value - The value to check.
 * @returns {value is Numeric} Whether the value is numeric.
 */
export function isNumeric(value: unknown): value is Numeric {
  const type = boundTypeOf(arguments);

  if (type === "number") return isFinite(value);

  if (type === "string" && value !== "" && value === (value as string).trim()) return isFinite(Number(value));

  return false;
}

unsetPrototype(isNumeric);
