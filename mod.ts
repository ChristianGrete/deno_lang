/**
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang
 */

export { hasTag, type InferredByTag } from "./has_tag.ts";
export { type Constructable, instanceOf } from "./instance_of.ts";
export { is } from "./is.ts";
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
export { isNaN } from "./is_nan.ts";
export { isNull } from "./is_null.ts";
export { isNumber } from "./is_number.ts";
export { isNumeric, type Numeric } from "./is_numeric.ts";
export { isObject, type Obj } from "./is_object.ts";
export { isPlainObject } from "./is_plain_object.ts";
export { isPrimitive, type Primitive, type PrimitiveType, primitiveTypes } from "./is_primitive.ts";
export { isRegExp } from "./is_regexp.ts";
export { isString } from "./is_string.ts";
export { type InferredByType, isType } from "./is_type.ts";
export { isUndefined } from "./is_undefined.ts";
export { isnt } from "./isnt.ts";
export {
  type BuiltinTagLabel,
  type ExtendedTagLabel,
  type NullOrUndefinedTagLabel,
  type TagLabel,
  tagLabelOf,
} from "./tag_label_of.ts";
export { type BuiltinTag, type ExtendedTag, type NullOrUndefinedTag, type Tag, tagOf } from "./tag_of.ts";
export {
  type BuiltinType,
  type ExtendedType,
  type NullOrUndefinedType,
  type Type,
  typeByTagLabel,
  typeOf,
} from "./type_of.ts";
