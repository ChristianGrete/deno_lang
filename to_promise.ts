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
 * Converts a value into a `Promise` object.
 *
 * @example
 * await toPromise(123); // 123
 * await toPromise(Promise.resolve("ok")); // "ok"
 * await toPromise(new Promise(() => {})); // still pending
 * await toPromise({ then: (res) => res("done") }); // "done"
 *
 * @name lang/to_promise.toPromise
 * @param {Resolved | PromiseLike<Resolved>} value - The value to convert.
 * @returns {Promise<Resolved>} The resulting `Promise` object.
 * @template Resolved
 */
export function toPromise<Resolved = unknown>(value: unknown): Promise<Resolved> {
  const type = boundTypeOf(arguments);

  if (type === "promise") return value as Promise<Resolved>;

  if (type === "object" && getType((value as Record<string, unknown>).then) === "function") {
    return resolve(value as PromiseLike<Resolved>);
  }

  return resolve(value as Resolved);
}

unsetPrototype(toPromise);
