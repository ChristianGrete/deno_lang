/**
 * Utility module for retrieving the tag label of a value (e.g.
 * `"[object Array]"`).
 *
 * The result is based on `Object.prototype.toString.call(value)` and may be
 * customized via `Symbol.toStringTag`.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/tag_label_of
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";

const { toString } = Object.prototype;

/**
 * A built-in tag label as defined in the ECMAScript specification.
 *
 * @name lang/tag_label_of.BuiltinTagLabel
 * @see {@link https://tc39.es/ecma262/#sec-object.prototype.tostring|ECMA-262 Spec}
 */
export type BuiltinTagLabel =
  | "[object Arguments]"
  | "[object Array]"
  | "[object Boolean]"
  | "[object Date]"
  | "[object Error]"
  | "[object Function]"
  | "[object Number]"
  | "[object Object]"
  | "[object RegExp]"
  | "[object String]";

/**
 * An additional tag label supported in modern JavaScript.
 *
 * @name lang/tag_label_of.ExtendedTagLabel
 */
export type ExtendedTagLabel =
  | "[object BigInt]"
  | "[object Map]"
  | "[object Promise]"
  | "[object Set]"
  | "[object Symbol]";

/**
 * A tag label for `null` or `undefined`.
 *
 * @name lang/tag_label_of.NullOrUndefinedTagLabel
 */
export type NullOrUndefinedTagLabel = "[object Null]" | "[object Undefined]";

/**
 * Any tag label as returned by {@link tagLabelOf}.
 *
 * @name lang/tag_label_of.TagLabel
 */
export type TagLabel = BuiltinTagLabel | ExtendedTagLabel | NullOrUndefinedTagLabel | string;

/**
 * Internal implementation of {@link tagLabelOf}.
 *
 * @name lang/tag_label_of~getTagLabel
 */
export const getTagLabel = toString.call.bind(toString) as (value: unknown) => TagLabel; // eslint-disable-line unused-imports/no-unused-vars

/**
 * Returns the tag label of a value (e.g. `"[object Array]"`).
 *
 * @example
 * tagLabelOf([]); // "[object Array]"
 * tagLabelOf(null); // "[object Null]"
 * tagLabelOf(Object.create(null)); // "[object Object]"
 *
 * @name lang/tag_label_of.tagLabelOf
 * @param {unknown} value - The value to inspect.
 * @returns {TagLabel} The tag label string.
 */
export function tagLabelOf(value: unknown): TagLabel {
  validateArgsLength(arguments);

  return getTagLabel(value);
}

unsetPrototype(tagLabelOf);
