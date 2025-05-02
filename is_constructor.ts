/**
 * Utility module for checking whether a value is a constructor function or class.
 *
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_constructor
 */

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";
import type { Func } from "./is_function.ts";
import { typeOf } from "./type_of.ts";

const { hasOwnProperty } = Object.prototype;

/**
 * A constructor function or class.
 *
 * Used as the return type by {@link isConstructor}.
 *
 * @name lang/is_constructor.Constructor
 */
export type Constructor = new (...args: unknown[]) => unknown;

/**
 * Checks whether a value is a constructor function or class.
 *
 * @function
 * @name lang/is_constructor.isConstructor
 * @param {unknown} value – The value to check.
 * @returns {value is Constructor} Whether the value is a constructor.
 * @see {@link lang/type_of.typeOf}
 */
export function isConstructor(
  value: unknown,
): value is Constructor {
  validateArgsLength(arguments);

  if (
    typeOf(value) !== "function" || !hasOwnProperty.call(value, "prototype") ||
    (value as Func).prototype == null
  ) return false;

  try {
    new new Proxy(value as Constructor, {
      construct: () => ({}),
    })();
    return true;
  } catch {
    return false;
  }
}

unsetPrototype(isConstructor);
