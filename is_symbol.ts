/**
 * Utility module for checking whether a value is a symbol.
 *
 * Uses `Object.prototype.toString` to ensure reliable detection of symbol
 * values, including wrapped symbols (e.g. `Object(Symbol("foo"))`).
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_symbol
 */

import { boundTypeOf, unsetPrototype } from "./internal/mod.ts";

/**
 * Checks whether a value is a symbol.
 *
 * @example
 * isSymbol(Symbol()); // true
 * isSymbol(Symbol("desc")); // true
 * isSymbol(Object(Symbol("foo"))); // true
 * isSymbol("Symbol()"); // false
 *
 * @name lang/is_symbol.isSymbol
 * @param {unknown} value - The value to check.
 * @returns {value is symbol} Whether the value is a symbol.
 * @see {@link lang/type_of.typeOf}
 */
export function isSymbol(value: unknown): value is symbol {
  return boundTypeOf(arguments) === "symbol";
}

unsetPrototype(isSymbol);
