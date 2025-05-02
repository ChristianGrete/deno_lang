/**
 * Utility module for checking whether a value is a regular expression.
 *
 * @author Miller Medeiros <miller@millermedeiros.com>
 * @author André Cruz <andremiguelcruz@msn.com>
 * @author Christian Grete <webmaster@christiangrete.com>
 * @author ChatGPT <chatgpt@openai.com>
 * @copyright © 2025 Christian Grete
 * @license MIT
 * @module lang/is_regexp
 * @see {@link https://github.com/mout/mout/blob/v1.2.4/src/lang/isRegExp.js|mout@1.2.4/lang/isRegExp}
 * @see {@link https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/isRegExp.js|mout-lang-type@0.6.0/lang/isRegExp}
 */

import { unsetPrototype } from "./internal/unset_prototype.ts";
import { validateArgsLength } from "./internal/validate_args_length.ts";
import { typeOf } from "./type_of.ts";

/**
 * Checks whether a value is a regular expression.
 *
 * @function
 * @name lang/is_regexp.isRegExp
 * @param {unknown} value – The value to check.
 * @returns {value is RegExp} Whether the value is a regular expression.
 * @see {@link lang/type_of.typeOf}
 */
export function isRegExp(value: unknown): value is RegExp {
  validateArgsLength(arguments);

  return typeOf(value) === "regexp";
}

unsetPrototype(isRegExp);
