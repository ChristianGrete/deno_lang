/**
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang
 */

export { type Constructable, instanceOf } from "./instance_of.ts";
export { type Arguments, isArguments } from "./is_arguments.ts";
export { isArray } from "./is_array.ts";
export { isBoolean } from "./is_boolean.ts";
export { isComplex } from "./is_complex.ts";
export { type Constructor, isConstructor } from "./is_constructor.ts";
export { isDate } from "./is_date.ts";
export { isEmpty } from "./is_empty.ts";
export { isFinite } from "./is_finite.ts";
export { type Func, isFunction } from "./is_function.ts";
export { isInstance } from "./is_instance.ts";
export { isInteger } from "./is_integer.ts";
export { isObject, type Obj } from "./is_object.ts";
export { isPrimitive, primitiveTypes } from "./is_primitive.ts";
export { isRegExp } from "./is_regexp.ts";
export { type InferredByType, isType } from "./is_type.ts";
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
