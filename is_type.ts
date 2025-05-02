/**
 * Utility module for checking whether a value has the expected runtime type.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_type
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isType.js|mout-lang-type@0.6.0/lang/isType}
 */

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";
import { type Type, typeOf } from "./type_of.ts";

const { toString } = Object.prototype;

/**
 * Mapping from runtime type strings to type guard return types.
 *
 * Used as return type by {@link isType}.
 *
 * @name lang/is_type.GuardByType
 */
export interface GuardByType {
  "arguments": ArrayLike<unknown>;
  "array": unknown[];
  "bigint": bigint;
  "boolean": boolean;
  "date": Date;
  "error": Error;
  "function": (...args: unknown[]) => unknown;
  "map": Map<unknown, unknown>;
  "null": null;
  "number": number;
  "object": Record<string, unknown>;
  "promise": Promise<unknown>;
  "regexp": RegExp;
  "set": Set<unknown>;
  "string": string;
  "symbol": symbol;
  "undefined": undefined;
}

/**
 * Checks whether a value is of the expected runtime type.
 *
 * @function
 * @name lang/is_type.isType
 * @param {unknown} value – The value to check.
 * @param {Type} type – The expected type string as returned by {@link typeOf}.
 * @returns {value is GuardByType[T]} Whether the value has the expected type.
 * @see {@link lang/type_of.typeOf}
 * @template T
 */
export function isType<T extends Type>(
  value: unknown,
  type: T,
): value is GuardByType[T] {
  validateArgsLength(arguments, 2);

  const argTagLabel = toString.call(type);

  if (argTagLabel !== "[object String]") {
    throw new TypeError(
      `Invalid argument 'type': expected string, got ${typeOf(type)}`,
    );
  }

  return typeOf(value) === type;
}

unsetPrototype(isType);
