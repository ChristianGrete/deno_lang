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

import { unsetPrototype, validateArgsLength } from "./internal/mod.ts";
import type { Arguments } from "./is_arguments.ts";
import type { Func } from "./is_function.ts";
import type { Obj } from "./is_object.ts";
import { getType, type Type } from "./type_of.ts";

const { toString } = Object.prototype;

/**
 * Mapping from runtime type strings to their corresponding TypeScript types.
 *
 * Used as type predicate by {@link isType}.
 *
 * @name lang/is_type.InferredByType
 */
export interface InferredByType {
  "arguments": Arguments;
  "array": unknown[];
  "bigint": bigint;
  "boolean": boolean;
  "date": Date;
  "error": Error;
  "function": Func;
  "map": Map<unknown, unknown>;
  "null": null;
  "number": number;
  "object": Obj;
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
 * @returns {value is InferredByType[T]} Whether the value has the expected type.
 * @see {@link lang/type_of.typeOf}
 * @template T
 */
export function isType<T extends Type>(
  value: unknown,
  type: T,
): value is InferredByType[T] {
  validateArgsLength(arguments, 2);

  const argTagLabel = toString.call(type);

  if (argTagLabel !== "[object String]") {
    throw new TypeError(
      `Invalid argument 'type': expected string, got ${getType(type)}`,
    );
  }

  return getType(value) === type;
}

unsetPrototype(isType);
