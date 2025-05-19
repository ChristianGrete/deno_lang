/**
 * Utility module for checking whether a value has the expected tag
 * (e.g. `"Array"`, `"Date"`, `"Map"`).
 *
 * Tags are derived from `Object.prototype.toString`, based on either the
 * value’s internal `[[Class]]` or a custom `Symbol.toStringTag` property.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/has_tag
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isKind.js|mout-lang-type@0.6.0/lang/isKind}
 */

import { unsetPrototype, validateArgsLength, validateStringArg } from "./internal/mod.ts";
import type { Arguments } from "./is_arguments.ts";
import type { Func } from "./is_function.ts";
import type { Obj } from "./is_object.ts";
import { getTag, type Tag } from "./tag_of.ts";

/**
 * Mapping from tag strings to their corresponding TypeScript types.
 *
 * Used as type predicate by {@link hasTag}.
 *
 * @name lang/has_tag~InferredByTag
 */
export interface InferredByTag {
  Arguments: Arguments;
  Array: unknown[];
  BigInt: bigint;
  Boolean: boolean;
  Date: Date;
  Error: Error;
  Function: Func;
  Map: Map<unknown, unknown>;
  Null: null;
  Number: number;
  Object: Obj;
  Promise: Promise<unknown>;
  RegExp: RegExp;
  Set: Set<unknown>;
  String: string;
  Symbol: symbol;
  Undefined: undefined;
}

/**
 * Checks whether a value has the expected tag.
 *
 * Tag strings of a value can be things like `"Array"`, `"Date"` or `"Map"`.
 *
 * @example
 * hasTag([], "Array"); // true
 * hasTag(new Date(), "Date"); // true
 * hasTag(123, "Number"); // true
 * hasTag({}, "Map"); // false
 *
 * @name lang/has_tag.hasTag
 * @param {unknown} value - The value to check.
 * @param {Tag} tag - The expected tag string as returned by {@link tagOf}.
 * @returns {value is InferredByTag[T]} Whether the value has the expected tag.
 * @see {@link lang/tag_of.tagOf}
 * @template T
 */
export function hasTag<T extends keyof InferredByTag>(value: unknown, tag: T): value is InferredByTag[T]; // eslint-disable-line unused-imports/no-unused-vars

export function hasTag<T extends string>(value: unknown, tag: T): boolean; // eslint-disable-line unused-imports/no-unused-vars

export function hasTag(value: unknown, tag: Tag): boolean {
  validateArgsLength(arguments, 2);
  validateStringArg("tag", tag);

  return getTag(value) === tag;
}

unsetPrototype(hasTag);
