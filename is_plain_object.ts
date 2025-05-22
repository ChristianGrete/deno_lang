/**
 * Utility module for checking whether a value is a plain object.
 *
 * A plain object is an object whose prototype is either `Object.prototype` or
 * `null`, such as those created by `{}`, `new Object()`, or
 * `Object.create(null)`.
 *
 * @author Conrad Zimmerman <me@conradz.com>
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Richard Gibson <richard.gibson@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_plain_object
 * @see {@link https://github.com/jquery/jquery/blob/3.7.1/src/core.js#L219|jquery@3.7.1/core.isPlainObject}
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isPlainObject.js|mout@1.2.4/lang/isPlainObject}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";
import type { Obj } from "./is_object.ts";

const { getPrototypeOf } = Object;

/**
 * Checks whether a value is a plain object.
 *
 * A plain object is an object created by `{}`, `new Object()`, or
 * `Object.create(null)`.
 *
 * @example
 * isPlainObject({}); // true
 * isPlainObject(Object.create(null)); // true
 * isPlainObject([]); // false
 * isPlainObject(new Date()); // false
 *
 * @name lang/is_plain_object.isPlainObject
 * @param {unknown} value - The value to check.
 * @returns {value is Obj} Whether the value is a plain object.
 */
export function isPlainObject(value: unknown): value is Obj {
  if (boundTypeOf(arguments) !== "object") return false;

  const proto = getPrototypeOf(value);

  return proto === null || proto === Object.prototype;
}

unsetPrototype(isPlainObject);
