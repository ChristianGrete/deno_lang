/**
 * Utility module for checking whether a value is a map.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of `Map`
 * objects, including subclasses and wrapped instances.
 *
 * This function does not match plain objects or map-like structures.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_map
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a map.
 *
 * @example
 * isMap(new Map()); // true
 * isMap(Object(new Map())); // true
 * isMap(new WeakMap()); // false
 * isMap({ set() {}, get() {} }); // false
 *
 * @name lang/is_map.isMap
 * @param {unknown} _value - The value to check.
 * @returns {_value is Map<unknown, unknown>} Whether the value is a map.
 * @see {@link lang/type_of.typeOf}
 */
export function isMap(_value: unknown): _value is Map<unknown, unknown> {
  return boundTypeOf(arguments) === "map";
}

unsetPrototype(isMap);
