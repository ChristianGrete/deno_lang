/**
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang
 */

export { type Constructor, instanceOf } from "./instance_of.ts";
export { type ArgumentsGuard, isArguments } from "./is_arguments.ts";
export { isComplex } from "./is_complex.ts";
export { type FunctionGuard, isFunction } from "./is_function.ts";
export { isInstance } from "./is_instance.ts";
export { isObject, type ObjectGuard } from "./is_object.ts";
export { isPrimitive, primitiveTypes } from "./is_primitive.ts";
export { isRegExp } from "./is_regexp.ts";
export { type GuardByType, isType } from "./is_type.ts";
export {
  type BuiltinTagLabels,
  type ExtendedTagLabels,
  type NullOrUndefinedTagLabels,
  type TagLabel,
  tagLabelOf,
} from "./tag_label_of.ts";
export {
  type BuiltinTags,
  type ExtendedTags,
  type NullOrUndefinedTags,
  type Tag,
  tagOf,
} from "./tag_of.ts";
export {
  type BuiltinTypes,
  type ExtendedTypes,
  type NullOrUndefinedTypes,
  type Type,
  typeByTagLabel,
  typeOf,
} from "./type_of.ts";
