/**
 * Utility module for converting a value into a `Promise` object.
 *
 * Converts any value into a `Promise` object. Supports native promises,
 * thenables, primitive values, and other non-promise objects.
 *
 * If the value is already a `Promise`, it will be returned as-is. Thenables are
 * wrapped using `Promise.resolve()`. All other values result in a resolved
 * promise.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_promise
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";
import { getType } from "./type_of.ts";

const resolve = Promise.resolve.bind(Promise);

/**
 * Determines the return type of {@link toPromise} for a given input type.
 *
 * @name lang/to_promise.PromiseFrom
 * @template Value
 */
export type PromiseFrom<Value> = Value extends PromiseLike<infer Resolved> ? Promise<Resolved> : Promise<Value>;

/**
 * Converts a value into a `Promise` object.
 *
 * @example
 * await toPromise(123); // 123
 * await toPromise(Promise.resolve("ok")); // "ok"
 * await toPromise(new Promise(() => {})); // still pending
 * await toPromise({ then: (res) => res("done") }); // "done"
 *
 * @name lang/to_promise.toPromise
 * @param {Value} value - The value to convert.
 * @returns {PromiseFrom<Value>} The resulting `Promise` object.
 * @template Value
 */
export function toPromise<Value = unknown>(value: Value): PromiseFrom<Value> {
  const type = boundTypeOf(arguments);

  if (type === "promise") return value as PromiseFrom<Value>;

  if (type === "object" && getType((value as PromiseLike<Value>).then) === "function") {
    return resolve(value) as PromiseFrom<Value>;
  }

  return resolve(value) as PromiseFrom<Value>;
}

unsetPrototype(toPromise);
