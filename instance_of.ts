/**
 * Utility module for checking whether a value is an instance of a constructor function or class.
 *
 * @author Valerio Proietti <kamicane@gmail.com>
 * @author Christoph Nakazawa <christoph.pojer@gmail.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/instance_of
 * @see {@link https://github.com/mootools/mootools-core/blob/1.6.0/Source/Core/Core.js#L47|mootools-core@1.6.0/Core/Core.instanceOf}
 */

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";

/**
 * A constructable function or class used by {@link instanceOf}.
 *
 * Supports both regular class constructors and hybrid constructors like `Date` or `RegExp`.
 *
 * @name lang/instance_of.Constructable
 * @template Instance
 */
export type Constructable<Instance = unknown> =
  // deno-lint-ignore no-explicit-any
  | (new (...args: any[]) => Instance)
  // deno-lint-ignore no-explicit-any
  | ((...args: any[]) => Instance);

/**
 * Checks whether a given value is an instance of the provided "constructable".
 *
 * @function
 * @name lang/instance_of.instanceOf
 * @param {unknown} value - The value to check.
 * @param {Constructable<Instance>} constructable - The function or class to test against.
 * @returns {value is Instance} Whether the value is an instance of the constructable.
 * @template Instance
 */
export function instanceOf<Instance>(
  value: unknown,
  constructable: Constructable<Instance>,
): value is Instance {
  validateArgsLength(arguments, 2);

  if (value == null) return false;

  if (typeof value !== "object" && typeof value !== "function") {
    value = Object(value);
  }

  return value instanceof constructable;
}

unsetPrototype(instanceOf);
