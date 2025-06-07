/**
 * Provides a safe and type-aware way to convert any value into an array.
 *
 * Converts array-like structures into real arrays and wraps everything else
 * into a single-element array. Unlike `Array.from()`, it won't throw on `null`,
 * plain objects, or functions - making it safe for unpredictable inputs.
 *
 * @author John Resig <jeresig@gmail.com>
 * @author Jörn Zaefferer <joern.zaefferer@gmail.com>
 * @author Ariel Flesler <aflesler@gmail.com>
 * @author Robert Katić <robert.katic@gmail.com>
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Richard Gibson <richard.gibson@gmail.com>
 * @author Rick Waldron <waldron.rick@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_array
 * @see {@link https://github.com/jquery/jquery/blob/3.7.1/src/core.js#L309|jquery@3.7.1/core.makeArray}
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/toArray.js|mout@1.2.4/lang/toArray}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import { nativeIsArray } from "./is_array.ts";
import { hasArrayLikeShape } from "./is_array_like.ts";

const { slice: nativeSlice } = Array.prototype;
const slice = nativeSlice.call.bind(nativeSlice) as (_value: ArrayLike<unknown>) => unknown[];

/**
 * Infers the return type of {@link toArray} based on the input type.
 *
 * @name lang/to_array.ArrayFrom
 * @template Value - The type to unwrap if array-like, or to wrap if not.
 */
export type ArrayFrom<Value> = [Value] extends [null | undefined] ? []
  : Value extends ArrayLike<infer Item> ? Item[] : Value[];

/**
 * @ignore
 */
export function toArray(value: []): []; // eslint-disable-line unused-imports/no-unused-vars

/**
 * Converts a value into an array.
 *
 * @example
 * toArray([1, 2, 3]); // [1, 2, 3]
 * toArray("hi"); // ["h", "i"]
 * toArray({ 0: "a", 1: "b", length: 2 }); // ["a", "b"]
 * toArray(null); // []
 *
 * @name lang/to_array.toArray
 * @param {Value} value - The value to convert.
 * @returns {ArrayFrom<Value>} The resulting array.
 * @template [Value=unknown] - Inferred type of the `value` argument, defaulting to `unknown`.
 */
export function toArray<Value = unknown>(value: Value): ArrayFrom<Value>; // eslint-disable-line unused-imports/no-unused-vars

export function toArray(value: unknown): unknown[] {
  validateArgsLength(arguments);

  if (nativeIsArray(value)) return slice(value);

  if (value == null) return [];

  if (!hasArrayLikeShape(value)) return [value];

  try {
    return slice(value);
  } catch {
    return [value as unknown];
  }
}

unsetPrototype(toArray);
