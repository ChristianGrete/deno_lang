# Contributing to [deno_lang][repository-github-url]

Thanks for your interest in contributing to **deno_lang** — every contribution is welcome, and we're genuinely glad
you're here!

This document covers everything you need to know to get started: how to set up your local environment, our code style,
best practices, and a few things we care about as a team.

Take a few minutes to read through — it helps everyone stay on the same page and helps keep collaboration easy and
enjoyable.

## Guiding principles

We aim to build an idiomatic, easy-to-understand API without compromising on runtime performance.

We're loosely following the structure of [denoland/std](https://github.com/denoland/std) and on top of that, we follow
these guiding principles:

- Filenames use `snake_case`
- Everything that's published must be tested
- Test files use the same name as their implementation, with a `_test` suffix
- Code should be reusable whenever possible
- Every public API must be clearly documented using [JSDoc](#jsdoc-style-guide)
- Internal code lives in [`./internal`](internal) or is marked as internal via JSDoc and not exported through `mod.ts`
- All public APIs expose **named functions**
- Everything is written in TypeScript and carefully typed
- No classic build tools from the Node.js/npm world — this is the Deno universe
- However, pure CLI tools from npm are allowed
- We aim to stay as cross-platform compatible as possible
- Code is formatted using [dprint](https://github.com/dprint/dprint), while remaining compatible with `deno fmt`
- Git hooks are managed using [lefthook](https://github.com/evilmartians/lefthook) and stored in
  [`./_git_hooks`](_git_hooks)
- More complex tasks go into [`./_tasks`](_tasks)
- Entry points are always named `mod.ts`
- We avoid hidden dotfiles in the repo whenever possible
- We respect the [Code of Conduct](CODE_OF_CONDUCT.md) and aim to stay open, helpful, and kind to one another
- Non-native speakers are encouraged to use AI tools for translating into US English
- We see AI not as a competitor, but as a sparring partner to help us reach the best possible outcome

## Getting started

This project uses a fork-based workflow — that means contributions should be made via forks and pull requests rather
than direct pushes.

### 1. Fork this repo

Click the **“Fork”** button on [GitHub][repository-github-url] to create your own copy of the repository — ideally name
your fork `deno_lang`.

### 2. Clone your fork

Once you've forked the repo, clone your copy as follows:

```sh
git clone git@github.com:<your-username>/deno_lang.git && cd deno_lang
```

### 3. Initialize your local copy

> ⚠️ This is a Deno 2 project — make sure you're using Deno v2.0.0 or newer!

Now run the following command to initialize the project for development:

```sh
deno task init
```

This will setup your environment and install Git hooks via [lefthook](https://github.com/evilmartians/lefthook) so
you're ready to contribute. You can rerun `deno task init` anytime to reset your Git hook setup.

## JSDoc style guide

- Each exported member must be documented using JSDoc.
- The first sentence of the comment should give a short, clear and concise explanation of what the function or type
  does. This may span multiple lines, but should not be overly verbose.
- If terminology is not self-explanatory, add a short description below the title to clarify the concept (e.g. what
  qualifies as an “arguments list”).
- The `@example` tag must appear **at the top** of the tag list (directly after the title/description), followed by a
  blank line. Only exported **functions** should include examples.
- All remaining `@tags` (`@param`, `@returns`, `@template`, `@see`, etc.) must be sorted alphabetically.
- Internal (non-exported) members should use a `@name` tag with a tilde (`~`), e.g. `@name lang/xyz~internalThing`.
- `@author`, `@copyright`, and `@license` may only appear in the **file-level header comment** at the top of the module.
- Wrap all lines at a maximum of 80 characters, except for:
  - `@see` URLs
  - inline tags like `{@link ...}`

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

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-github-url]: https://github.com/denoverse/lang
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
