/**
 * Provides a safe and predictable way to convert values into promise objects.
 *
 * Converts native promises, thenables, and other values into promise objects.
 * Input promises are returned unchanged, while thenables are wrapped using
 * `Promise.resolve()`. Primitive and non-promise values result in immediately
 * resolved promises.
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
 * Infers the return type of {@link toPromise} based on the input type.
 *
 * @name lang/to_promise.PromiseFrom
 * @template Value - The type to unwrap if thenable, or to wrap if not.
 */
export type PromiseFrom<Value> = Value extends PromiseLike<infer Resolved> ? Promise<Resolved> : Promise<Value>;

/* eslint-disable jsdoc/check-template-names, jsdoc/require-template */

/**
 * Converts a value into a promise object.
 *
 * @example
 * await toPromise(123); // 123
 * await toPromise(Promise.resolve("ok")); // "ok"
 * await toPromise(new Promise(() => {})); // still pending
 * await toPromise({ then: (res) => res("done") }); // "done"
 *
 * @name lang/to_promise.toPromise
 * @param {Value} value - The value to convert.
 * @returns {PromiseFrom<Value>} The resulting promise object.
 * @template [Value=unknown] - Inferred type of the `value` argument, defaulting to `unknown`.
 */
export function toPromise<Value = unknown>(value: Value): PromiseFrom<Value> {
  const type = boundTypeOf(arguments);

  if (type === "promise") return value as PromiseFrom<Value>;

  if (type === "object" && getType((value as PromiseLike<Value>).then) === "function") {
    return resolve(value) as PromiseFrom<Value>;
  }

  return resolve(value) as PromiseFrom<Value>;
}

/* eslint-enable jsdoc/check-template-names, jsdoc/require-template */

unsetPrototype(toPromise);
