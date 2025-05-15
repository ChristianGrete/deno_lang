/**
 * Utility module for determining the runtime type of a value.
 *
 * Uses tag-based detection for accurate results beyond `typeof`.
 *
 * @author Valerio Proietti <kamicane@gmail.com>
 * @author Christoph Nakazawa <christoph.pojer@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/type_of
 * @see {@link https://github.com/mootools/mootools-core/blob/1.2.6/Source/Core/Core.js#L259|mootools-core@1.2.6/Core/Core.$type}
 * @see {@link https://github.com/mootools/mootools-core/blob/1.6.0/Source/Core/Core.js#L32|mootools-core@1.6.0/Core/Core.typeOf}
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/typeOf.js|mout-lang-type@0.6.0/lang/typeOf}
 */

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";
import { getTagLabel, type TagLabel } from "./tag_label_of.ts";

const { freeze } = Object;

/**
 * Built-in runtime types defined in the ECMAScript specification.
 *
 * @name lang/type_of.BuiltinTypes
 * @see {@link https://tc39.es/ecma262/#sec-object.prototype.tostring|ECMA-262 Spec}
 */
export type BuiltinTypes =
  | "arguments"
  | "array"
  | "boolean"
  | "date"
  | "error"
  | "function"
  | "number"
  | "object"
  | "regexp"
  | "string";

/**
 * Additional runtime types supported in modern JavaScript.
 *
 * @name lang/type_of.ExtendedTypes
 */
export type ExtendedTypes = "bigint" | "map" | "promise" | "set" | "symbol";

/**
 * Runtime types for `null` and `undefined`.
 *
 * @name lang/type_of.NullOrUndefinedTypes
 */
export type NullOrUndefinedTypes = "null" | "undefined";

/**
 * All supported runtime types as returned by {@link typeOf}.
 *
 * @name lang/type_of.Type
 */
export type Type = BuiltinTypes | ExtendedTypes | NullOrUndefinedTypes;

/**
 * Mapping from tag label strings to runtime type strings.
 *
 * Used by {@link typeOf}.
 *
 * @name lang/type_of.typeByTagLabel
 * @readonly
 */
export const typeByTagLabel = freeze(
  {
    "[object Arguments]": "arguments",
    "[object Array]": "array",
    "[object BigInt]": "bigint",
    "[object Boolean]": "boolean",
    "[object Date]": "date",
    "[object Error]": "error",
    "[object Function]": "function",
    "[object Map]": "map",
    "[object Number]": "number",
    "[object Object]": "object",
    "[object Promise]": "promise",
    "[object RegExp]": "regexp",
    "[object Set]": "set",
    "[object String]": "string",
    "[object Symbol]": "symbol",
  } as const,
);

/**
 * Internal impementation of {@link typeOf}.
 *
 * @name lang/type_of~getType
 */
export const getType = (value: unknown): Type => {
  if (value == null) return (value + "") as NullOrUndefinedTypes;

  const type = typeof value;

  return type === "object" ? ((typeByTagLabel as Record<TagLabel, Type>)[getTagLabel(value)] ?? "object") : type;
};

/**
 * Determines the runtime type of a value.
 *
 * @name lang/type_of.typeOf
 * @param {unknown} value - The value to check.
 * @returns {Type} A string representing the value's type.
 * @see {@link lang/tag_label_of.tagLabelOf}
 */
export function typeOf(value: unknown): Type {
  validateArgsLength(arguments);

  return getType(value);
}

unsetPrototype(typeOf);
