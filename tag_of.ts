/**
 * Utility module for extracting the tag of a value (e.g. `"Array"`).
 *
 * The result is based on the internal tag used by `Object.prototype.toString`, minus the surrounding "[object ...]".
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
 * Built-in tags defined in the ECMAScript specification.
 *
 * @name lang/tag_of.BuiltinTags
 * @see {@link https://tc39.es/ecma262/#sec-object.prototype.tostring|ECMA-262 Spec}
 */
export type BuiltinTags =
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
 * Additional tags supported in modern JavaScript.
 *
 * @name lang/tag_of.ExtendedTags
 */
export type ExtendedTags = "BigInt" | "Map" | "Promise" | "Set" | "Symbol";

/**
 * Tags for `null` and `undefined`.
 *
 * @name lang/tag_of.NullOrUndefinedTags
 */
export type NullOrUndefinedTags = "Null" | "Undefined";

/**
 * All supported tags as returned by {@link tagOf}.
 *
 * @name lang/tag_of.Tag
 */
export type Tag = BuiltinTags | ExtendedTags | NullOrUndefinedTags | string;

/**
 * Extracts the tag (e.g. `"Array"`, `"Date"`, `"Map"`) of a given value.
 *
 * @function
 * @name lang/tag_of.tagOf
 * @param {unknown} value - The value to inspect.
 * @returns {Tag} The tag string.
 * @see {@link lang/tag_label_of.tagLabelOf}
 */
export function tagOf(value: unknown): Tag {
  validateArgsLength(arguments);

  return getTagLabel(value).slice(8, -1);
}

unsetPrototype(tagOf);
