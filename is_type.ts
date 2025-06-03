/**
 * Utility module for checking whether a value has the expected runtime type.
 *
 * This wraps {@link lang/type_of.typeOf} and acts as a type guard for common
 * runtime types like "array", "function" or "null".
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_type
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isType.js|mout-lang-type@0.6.0/lang/isType}
 */

import { unsetPrototype, validateArgsLength, validateStringArg } from "./internal/mod.ts";
import type { Arguments } from "./is_arguments.ts";
import type { Func } from "./is_function.ts";
import type { Obj } from "./is_object.ts";
import { getType, type Type as TypeString } from "./type_of.ts";

/**
 * Mapping from runtime type strings to their corresponding TypeScript types.
 *
 * Used to infer type predicates in {@link isType}.
 *
 * @name lang/is_type.InferredByType
 */
export interface InferredByType {
  arguments: Arguments;
  array: unknown[];
  bigint: bigint;
  boolean: boolean;
  date: Date;
  error: Error;
  function: Func;
  map: Map<unknown, unknown>;
  null: null;
  number: number;
  object: Obj;
  promise: Promise<unknown>;
  regexp: RegExp;
  set: Set<unknown>;
  string: string;
  symbol: symbol;
  undefined: undefined;
}

/**
 * Checks whether a value is of the expected runtime type.
 *
 * @example
 * isType([], "array"); // true
 * isType(null, "null"); // true
 * isType(() => {}, "function"); // true
 * isType("hi", "object"); // false
 *
 * @name lang/is_type.isType
 * @param {unknown} value - The value to check.
 * @param {TypeString} type - The expected type string as returned by {@link lang/type_of.typeOf}.
 * @returns {value is InferredByType[Type]} Whether the value has the expected type.
 * @see {@link lang/type_of.typeOf}
 * @template Type
 */
export function isType<Type extends TypeString>(value: unknown, type: Type): value is InferredByType[Type] {
  validateArgsLength(arguments, 2);
  validateStringArg("type", type);

  return getType(value) === type;
}

unsetPrototype(isType);
