/**
 * Utility module for checking whether a value is considered empty.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_empty
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isEmpty.js|mout@1.2.4/lang/isEmpty}
 */

import { boundTypeOf, hasOwnProperty, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is considered empty.
 *
 * @function
 * @name lang/is_empty.isEmpty
 * @param {unknown} value - The value to check.
 * @returns {boolean} Whether the value is empty.
 */
export function isEmpty(value: unknown): boolean {
  const type = boundTypeOf(arguments);

  switch (type) {
    case "null":
    case "undefined":
      return true;

    case "array":
    case "string":
      return (value as unknown[] | string).length === 0;

    case "map":
    case "set":
      return (value as Map<unknown, unknown> | Set<unknown>).size === 0;

    case "object":
      for (const key in value as Record<PropertyKey, unknown>) {
        if (hasOwnProperty(value, key)) return false;
      }
      return true;
  }

  return false;
}

unsetPrototype(isEmpty);
