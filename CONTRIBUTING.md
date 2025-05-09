# Contributing to [deno_lang][repository-github-url]

### JSDoc Style Guide

* Each exported member must be documented using JSDoc.

* The first sentence of the comment should give a short, clear and concise
  explanation of what the function or type does. This may span multiple lines,
  but should not be overly verbose.

* If terminology is not self-explanatory, add a short description below the
  title to clarify the concept (e.g. what qualifies as an “arguments list”).

* The `@example` tag must appear **at the top** of the tag list (directly after
  the title/description), followed by a blank line. Only exported **functions**
  should include examples.

* All remaining `@tags` (`@param`, `@returns`, `@template`, `@see`, etc.) must
  be sorted alphabetically.

* Internal (non-exported) members should use a `@name` tag with a tilde
  (`~`), e.g. `@name lang/xyz~internalThing`.

* `@author`, `@copyright`, and `@license` may only appear in the
  **file-level header comment** at the top of the module.

* Wrap all lines at a maximum of 80 characters, except for:

  * `@see` URLs
  * inline tags like `{@link ...}`

**Example:**

```ts
/**
 * Checks whether a value has the expected tag.
 *
 * Tag strings of a value can be things like `"Array"`, `"Date"` or `"Map"`.
 *
 * @example
 * hasTag([], "Array"); // true
 * hasTag({}, "Map");   // false
 *
 * @param {unknown} value - The value to check.
 * @param {Tag} tag - The tag to compare against.
 * @returns {boolean} Whether the value has the expected tag.
 */
```

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for [Denoverse](repository-organization-url) and [contributors](repository-contributors-url)

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-github-url]: https://github.com/denoverse/lang
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com