/**
 * Utility module for extracting the tag of a value (e.g. `"Array"`).
 *
 * The result is based on the internal tag used by
 * `Object.prototype.toString`, minus the surrounding `"[object ...]"`.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Max Nordlund <max.nordlund@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/tag_of
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/kindOf.js|mout@1.2.4/lang/kindOf}
 */

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import { getTagLabel } from "./tag_label_of.ts";

/**
 * A built-in tag as defined in the ECMAScript specification.
 *
 * @name lang/tag_of.BuiltinTag
 * @see {@link https://tc39.es/ecma262/#sec-object.prototype.tostring|ECMA-262 Spec}
 */
export type BuiltinTag =
  | "Arguments"
  | "Array"
  | "Boolean"
  | "Date"
  | "Error"
  | "Function"
  | "Number"
  | "Object"
  | "RegExp"
  | "String";

/**
 * An additional tag supported in modern JavaScript.
 *
 * @name lang/tag_of.ExtendedTag
 */
export type ExtendedTag = "BigInt" | "Map" | "Promise" | "Set" | "Symbol";

/**
 * A tag for `null` or `undefined`.
 *
 * @name lang/tag_of.NullOrUndefinedTag
 */
export type NullOrUndefinedTag = "Null" | "Undefined";

/**
 * Any tag as returned by {@link tagOf}.
 *
 * @name lang/tag_of.Tag
 */
export type Tag = BuiltinTag | ExtendedTag | NullOrUndefinedTag | string;

/**
 * Internal implementation of {@link tagOf}.
 *
 * @name lang/tag_of~getTag
 */
export const getTag = (value: unknown): Tag => getTagLabel(value).slice(8, -1);

/**
 * Extracts the tag (e.g. `"Array"`, `"Date"`, `"Map"`) of a given value.
 *
 * @example
 * tagOf([]); // "Array"
 * tagOf(null); // "Null"
 * tagOf(Object.create(null)); // "Object"
 *
 * @name lang/tag_of.tagOf
 * @param {unknown} value - The value to inspect.
 * @returns {Tag} The tag string.
 * @see {@link lang/tag_label_of.tagLabelOf}
 */
export function tagOf(value: unknown): Tag {
  validateArgsLength(arguments);

  return getTag(value);
}

unsetPrototype(tagOf);
