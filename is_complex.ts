/**
 * Utility module for checking whether a value is a complex (non-primitive)
 * value.
 *
 * This is the logical inverse of {@link lang/is_primitive.isPrimitive}.
 * Returns `true` for objects, arrays, functions, and other non-primitives.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_complex
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isComplex.js|mout-lang-type@0.6.0/lang/isComplex}
 */

import { unsetPrototype } from "./internal/mod.ts";
import { isPrimitive } from "./is_primitive.ts";

/**
 * Checks whether a value is complex (i.e. not a primitive like string,
 * number, etc.).
 *
 * @example
 * isComplex({}); // true
 * isComplex([]); // true
 * isComplex(() => {}); // true
 * isComplex("hello"); // false
 * isComplex(null); // false
 *
 * @name lang/is_complex.isComplex
 * @param {unknown} value - The value to check.
 * @returns {boolean} Whether the value is complex.
 * @see {@link lang/is_primitive.isPrimitive}
 */
export function isComplex(...args: [value: unknown]): boolean {
  return !isPrimitive(...args);
}

unsetPrototype(isComplex);
