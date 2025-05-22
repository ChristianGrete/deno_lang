/**
 * Utility module for checking whether a value is a primitive value.
 *
 * This includes `null`, `undefined`, and values whose `typeof` result is
 * `"bigint"`, `"boolean"`, `"number"`, `"string"`, or `"symbol"`.
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

const { freeze } = Object;
const types = ["bigint", "boolean", "null", "number", "string", "symbol", "undefined"] as const;

/**
 * Represents a runtime primitive value.
 *
 * Includes `null`, `undefined`, and all values whose `typeof` result
 * is `"bigint"`, `"boolean"`, `"number"`, `"string"`, or `"symbol"`.
 *
 * Used as type predicate by {@link isPrimitive}.
 *
 * @name lang/is_primitive.Primitive
 */
export type Primitive = bigint | boolean | null | number | string | symbol | undefined;

/**
 * Any primitive runtime type.
 *
 * @name lang/is_primitive.PrimitiveType
 */
export type PrimitiveType = typeof types[number];

/**
 * Set of all primitive runtime types.
 *
 * Used internally by {@link isPrimitive}.
 *
 * @name lang/is_primitive.primitiveTypes
 * @readonly
 */
export const primitiveTypes: ReadonlySet<PrimitiveType> = freeze(new Set(types));

/**
 * Checks whether a value is a primitive (i.e. not an object or function).
 *
 * @example
 * isPrimitive(null); // true
 * isPrimitive(undefined); // true
 * isPrimitive(42); // true
 * isPrimitive("hello"); // true
 * isPrimitive({}); // false
 *
 * @name lang/is_primitive.isPrimitive
 * @param {unknown} value - The value to check.
 * @returns {value is Primitive} Whether the value is primitive.
 */
export function isPrimitive(value: unknown): value is Primitive {
  validateArgsLength(arguments);

  return value == null || (primitiveTypes as ReadonlySet<string>).has(typeof value);
}

unsetPrototype(isPrimitive);
