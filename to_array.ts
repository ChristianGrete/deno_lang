/**
 * Utility module for converting any value into an array.
 *
 * If the value is array-like, its contents will be copied into a new array.
 * Otherwise, the value is wrapped in a single-element array.
 *
 * Unlike `Array.from`, this handles non-iterables like `null`, `RegExp` or
 * `Function` without throwing.
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
import { hasArrayLikeShape } from "./is_array_like.ts";

const { slice: nativeSlice } = Array.prototype;
const slice = nativeSlice.call.bind(nativeSlice);

/**
 * Determines the return type of {@link toArray} for a given input type.
 *
 * @name lang/to_array.ArrayFrom
 * @template Value
 */
export type ArrayFrom<Value> = Value extends ArrayLike<infer Item> ? Item[] : Value[];

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
 * @template Value
 */
export function toArray<Value = unknown>(value: Value): ArrayFrom<Value> {
  validateArgsLength(arguments);

  if (value == null) return [] as unknown as ArrayFrom<Value>;

  if (!hasArrayLikeShape(value)) return [value] as ArrayFrom<Value>;

  try {
    return slice(value) as ArrayFrom<Value>;
  } catch {
    return [value] as ArrayFrom<Value>;
  }
}

unsetPrototype(toArray);
