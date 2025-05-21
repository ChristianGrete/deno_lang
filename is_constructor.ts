/**
 * Utility module for checking whether a value is a constructor function or
 * class.
 *
 * Unlike a plain function, a constructor must be callable via `new` and
 * define a `.prototype` property. This check safely detects both classes
 * and constructor functions.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_constructor
 */

import { boundTypeOf, hasOwnProperty, unsetPrototype } from "./internal/mod.ts";
import type { Func } from "./is_function.ts";

/**
 * A constructor function or class.
 *
 * Used as the return type by {@link isConstructor}.
 *
 * @name lang/is_constructor.Constructor
 */
export type Constructor = new (...args: unknown[]) => unknown; // eslint-disable-line unused-imports/no-unused-vars

/**
 * Checks whether a value is a constructor function or class.
 *
 * @example
 * class Foo {}
 * function Bar() {}
 * isConstructor(Foo); // true
 * isConstructor(Bar); // true
 * isConstructor(() => {}); // false
 * isConstructor({}); // false
 *
 * @name lang/is_constructor.isConstructor
 * @param {unknown} value - The value to check.
 * @returns {value is Constructor} Whether the value is a constructor.
 * @see {@link lang/type_of.typeOf}
 */
export function isConstructor(value: unknown): value is Constructor {
  if (
    boundTypeOf(arguments) !== "function" || !hasOwnProperty(value, "prototype") || (value as Func).prototype == null
  ) return false;

  try {
    new new Proxy(value as Constructor, { construct: () => ({}) })();
    return true;
  } catch {
    return false;
  }
}

unsetPrototype(isConstructor);
