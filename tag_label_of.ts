/**
 * Utility module for retrieving the tag label of a value (e.g. "[object Array]").
 *
 * The result is based on `Object.prototype.toString.call(value)` and can be customized via `Symbol.toStringTag`.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/tag_label_of
 */

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";

const { toString } = Object.prototype;

/**
 * Built-in tag labels defined in the ECMAScript specification.
 *
 * @name lang/tag_label_of.BuiltinTagLabels
 * @see {@link https://tc39.es/ecma262/#sec-object.prototype.tostring|ECMA-262 Spec}
 */
export type BuiltinTagLabels =
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
 * Additional tag labels supported in modern JavaScript.
 *
 * @name lang/tag_label_of.ExtendedTagLabels
 */
export type ExtendedTagLabels =
  | "[object BigInt]"
  | "[object Map]"
  | "[object Promise]"
  | "[object Set]"
  | "[object Symbol]";

/**
 * Tag labels for `null` and `undefined`.
 *
 * @name lang/tag_label_of.NullOrUndefinedTagLabels
 */
export type NullOrUndefinedTagLabels = "[object Null]" | "[object Undefined]";

/**
 * All supported tag labels as returned by {@link tagLabelOf}.
 *
 * @name lang/tag_label_of.TagLabel
 */
export type TagLabel =
  | BuiltinTagLabels
  | ExtendedTagLabels
  | NullOrUndefinedTagLabels
  | string;

/**
 * Returns the tag label of a value (e.g. "[object Array]").
 *
 * @function
 * @name lang/tag_label_of.tagLabelOf
 * @param {unknown} value – The value to inspect.
 * @returns {TagLabel} The tag label string.
 */
export function tagLabelOf(value: unknown): TagLabel {
  validateArgsLength(arguments);

  return toString.call(value);
}

unsetPrototype(tagLabelOf);
