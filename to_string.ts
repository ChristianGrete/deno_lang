/**
 * Utility module for converting a value into a string.
 *
 * This implementation returns an empty string for `null` or `undefined`. All
 * other values are safely converted using JavaScript's `String()` constructor.
 *
 * @author Conrad Zimmerman <me@conradz.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/to_string
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/toString.js|mout@1.2.4/lang/toString}
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Converts a value into a string.
 *
 * @example
 * toString(null); // ""
 * toString(undefined); // ""
 * toString(42); // "42"
 * toString(true); // "true"
 *
 * @name lang/to_string.toString
 * @param {unknown} value - The value to convert.
 * @returns {string} The resulting string.
 */
export function toString(value: unknown): string {
  const type = boundTypeOf(arguments);

  if (type === "symbol" && typeof value !== "symbol") return (value as symbol).toString();

  return value == null ? "" : String(value);
}

unsetPrototype(toString);
