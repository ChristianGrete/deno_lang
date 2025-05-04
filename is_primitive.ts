/**
 * Utility module for checking whether a value is a primitive value.
 *
 * @author Garrick Cheung <garrick@garrickcheung.com>
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_primitive
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isPrimitive.js|mout@1.2.4/lang/isPrimitive}
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isPrimitive.js|mout-lang-type@0.6.0/lang/isPrimitive}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";

/**
 * Set of all primitive `typeof` return values.
 *
 * Used internally by {@link isPrimitive}.
 *
 * @const
 * @name lang/is_primitive.primitiveTypes
 */
export const primitiveTypes = new Set([
  "bigint",
  "boolean",
  "number",
  "string",
  "symbol",
]);

/**
 * Checks whether a value is a primitive (i.e. not an object or function).
 *
 * @function
 * @name lang/is_primitive.isPrimitive
 * @param {unknown} value - The value to check.
 * @returns {boolean} Whether the value is primitive.
 */
export function isPrimitive(value: unknown): boolean {
  validateArgsLength(arguments);

  return value == null || primitiveTypes.has(typeof value);
}

unsetPrototype(isPrimitive);
