# Contributing to [deno\_lang][repository-github-url]

Thanks for your interest in contributing to **deno\_lang** — every contribution is welcome, and we’re genuinely glad
you’re here!

This document covers everything you need to know to get started: how to set up your local environment, our code style,
best practices, and a few things we care about as a team.

Take a few minutes to read through — it helps everyone stay on the same page and helps keep collaboration easy and
enjoyable.

## Table of contents

- [Getting started](#getting-started)
- [Guiding principles](#guiding-principles)
- [Tasks](#tasks)
- [Prompts](#prompts)
- [Git hooks](#git-hooks)
- [Linters and formatters](#linters-and-formatters)
- [Dependencies](#dependencies)
- [JSDoc style guide](#jsdoc-style-guide)
- [Testing strategy](#testing-strategy)

## Getting started

This project uses a fork-based workflow — that means contributions should be made via forks and pull requests rather
than direct pushes.

### 1. Fork this repo

Click the **“Fork”** button on [GitHub][repository-github-url] to create your own copy of the repository — ideally name
your fork `deno_lang`.

### 2. Clone your fork

Once you’ve forked the repo, clone your copy as follows:

```sh
git clone git@github.com:<your-username>/deno_lang.git && cd deno_lang
```

### 3. Initialize your local copy

> ⚠️ This is a Deno 2 project — make sure you’re using Deno v2.2 or newer!

Now run the following command to initialize the project for development:

```sh
deno task init
```

This will setup your environment and install Git hooks via [lefthook](https://github.com/evilmartians/lefthook) so
you’re ready to contribute. You can rerun `deno task init` anytime to reset your Git hook setup.

## Guiding principles

We aim to build an idiomatic, easy-to-understand API without compromising on runtime performance.

We’re loosely following the structure of [denoland/std](https://github.com/denoland/std) and on top of that, we follow
these guiding principles:

- Filenames use `snake_case`
- Everything that’s published must be tested
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
  [`./git_hooks`](git_hooks)
- More complex tasks go into [`./tasks`](tasks)
- Common prompts are stored in [`./gpt_prompts`](gpt_prompts) and can be used via `deno task prompt`
- Entry points are always named `mod.ts`
- We avoid hidden dotfiles in the repo whenever possible
- We respect the [Code of Conduct](CODE_OF_CONDUCT.md) and aim to stay open, helpful, and kind to one another
- Non-native speakers are encouraged to use AI tools for translating into US English
- We see AI not as a competitor, but as a sparring partner to help us reach the best possible outcome

## Tasks

To reduce system-level dependencies and automate repetitive actions, all essential workflows are available as Deno
tasks:

| Task command                          | Description                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `deno task dprint-check [files...]`   | Runs `dprint check` for the whole project or the specified `.json`, `.md`, `.ts`, or `.yml` files |
| `deno task dprint-fmt [files...]`     | Runs `dprint fmt` for the whole project or the specified `.json`, `.md`, `.ts`, or `.yml` files   |
| `deno task eslint [files...]`         | Runs ESLint for the whole project or the specified `.json` or `.ts` files                         |
| `deno task eslint-fix [files...]`     | Same as above, but with auto-fix enabled (`--fix`)                                                |
| `deno task fmt [files...]`            | Formats code using `deno lint --fix`, `eslint --fix`, and `dprint fmt` in one unified task        |
| `deno task init`                      | Initializes the project (currently just runs the `install` task)                                  |
| `deno task install`                   | Runs all `install:*` subtasks in parallel                                                         |
| `deno task install:deps`              | Installs project dependencies via `deno install`                                                  |
| `deno task install:hooks`             | Installs Git hooks using the `lefthook` CLI                                                       |
| `deno task lint [files...]`           | Lints code using `deno lint`, `eslint`, and `dprint check` combined                               |
| `deno task prompt <prompt> [args...]` | Generates a specific ChatGPT prompt message and copies the result to the clipboard                |
| `deno task run-p <tasks...>`          | Shorthand to run tasks in parallel                                                                |
| `deno task run-s <tasks...>`          | Shorthand to run tasks sequentially                                                               |
| `deno task test [files...]`           | Runs `deno test` for all tests or only those matching or related to the specified `.ts` files     |

Some additional tasks like `commitlint`, `dprint`, `lefthook` and `lint-staged` are exposed for convenience, but mainly
serve as internal CLI wrappers.

## Prompts

Using the command `deno task prompt <prompt> [...args]`, you can generate predefined ChatGPT prompts. The `<prompt>`
value refers to a filename in [`./gpt_prompts`](gpt_prompts) (without the file extension), and `[...args]` are the
accepted arguments defined by that specific prompt file.

These prompts are optional helpers and not part of the project’s automation pipeline.

Generated prompts are copied to the clipboard and open ChatGPT in a new browser window, allowing you to paste the prompt
directly.

Developers are responsible for any required licenses and access to appropriate GPT models themselves.

## Git hooks

We use [lefthook](https://github.com/evilmartians/lefthook) to manage Git hooks. All hooks are defined in
[`./lefthook.yml`](lefthook.yml).

Run `deno task init` (or specifically `deno task install:hooks`) to install them.

More complex logic is handled in hook-specific scripts under [`./git_hooks`](git_hooks).

| Hook          | Purpose                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `commit-msg`  | Checks commit messages for [Conventional Commit](https://conventionalcommits.org) format using [`commitlint`](https://commitlint.js.org) |
| `post-commit` | You'll need to contribute to see that                                                                                                    |
| `pre-commit`  | Typechecks, lints, formats and tests staged files via [`lint-staged`](https://github.com/lint-staged/lint-staged)                        |

## Linters and formatters

To keep our codebase consistent and minimize unnecessary diffs, we aggregate multiple linters and formatters into a
single, layered workflow. We start with the default formatting of `deno fmt`, extended to a maximum line length of 120
characters. Every additional rule is designed to complement this foundation without causing conflicts — we follow a
**progressive enhancement** philosophy.

In order, we run:

- `deno lint` / `deno lint --fix` to enforce and apply common Deno conventions
- `eslint` / `eslint --fix` for additional custom rules, such as alphabetical sorting of imports, exports, and object
  keys
- `dprint check` / `dprint fmt` for verifying and applying Deno-compatible formatting rules

Additionally, before every commit, `lint-staged` checks all staged filenames to ensure `snake_case` conventions are
followed. All staged `.ts` files are type-checked using `deno check`. If successful, tests are run and the commit
message is validated using `commitlint` to ensure compliance with the Conventional Commits spec.

JSDoc comments are also linted to some extent and should not exceed 80 characters per line. To help with this, there's a
predefined ChatGPT prompt available via `deno task prompt fmt_comments <file>` that formats all JSDoc comments in a
file. A final review is still required afterward to ensure ChatGPT hasn’t snuck in any little Easter eggs.

## Dependencies

We do not allow any Node.js or npm runtime dependencies in published modules intended as part of the public API. All
imports must either reference local files or use absolute URLs.

For build scripts, configuration, or development tooling, imports from the npm registry (e.g. via `npm:` or `jsr:`
prefixes) are allowed. However, **Node.js built-in modules must not be imported** — any `node:`-prefixed imports are
explicitly disallowed, regardless of context. Import maps may be used for development purposes, but must not leak into
the public API surface or affect published packages.

## JSDoc style guide

See the style guide below to keep documentation consistent and clean across the project.

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

## Testing strategy

We aim for 100% unit test coverage on all public APIs using `Deno.test`. Integration tests or cross-environment testing
(such as in-browser environments) are planned for future iterations, but are not currently implemented.

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-github-url]: https://github.com/denoverse/lang
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
