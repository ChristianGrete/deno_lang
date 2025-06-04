/**
 * Utility module for checking whether a value is a plain object.
 *
 * A plain object is an object whose prototype is either `Object.prototype` or
 * `null`, such as those created by `{}`, `new Object()`, or
 * `Object.create(null)`.
 *
 * @author Yehuda Katz <wycats@gmail.com>
 * @author Robert Katić <robert.katic@gmail.com>
 * @author John Resig <jeresig@gmail.com>
 * @author Michael Geary <mike@geary.com>
 * @author Rick Waldron <waldron.rick@gmail.com>
 * @author Conrad Zimmerman <me@conradz.com>
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Timmy Willison <4timmywil@gmail.com>
 * @author Richard Gibson <richard.gibson@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_plain_object
 * @see {@link https://github.com/jquery/jquery/blob/3.7.1/src/core.js#L219|jquery@3.7.1/core.isPlainObject}
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isPlainObject.js|mout@1.2.4/lang/isPlainObject}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import type { Obj } from "./is_object.ts";
import { getType } from "./type_of.ts";

const { getPrototypeOf } = Object;

/**
 * Internal implementation of {@link isPlainObject}.
 *
 * Greetings to Mr. Resig, whose function name existed in jQuery for 25 days
 * and now continues its life here as an internal helper.
 *
 * @name lang/is_plain_object~isObjectLiteral
 */
export const isObjectLiteral = (value: unknown): boolean => {
  if (getType(value) !== "object") return false;

  const proto = getPrototypeOf(value);

  return proto === null || proto === Object.prototype;
};

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
  validateArgsLength(arguments);

  return isObjectLiteral(value);
}

unsetPrototype(isPlainObject);
