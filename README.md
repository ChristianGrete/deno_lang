# [deno\_lang][repository-github-url]

> Also known as [@denoverse/lang](https://jsr.io/@denoverse/lang) and [x/lang][repository-module-url].

[![deno.land/x/lang](https://img.shields.io/badge/x%2Flang-70ffaf?logo=deno\&logoColor=172723\&labelColor=f5f5f5)][repository-module-url]
[![JSR @denoverse](https://jsr.io/badges/@denoverse)](https://jsr.io/@denoverse)
[![Assisted by ChatGPT](https://img.shields.io/badge/ChatGPT-Co--authored-412991?logo=openai\&logoColor=fff\&labelColor=000)](https://chatgpt.com)
[![“Check” workflow status](https://github.com/denoverse/lang/actions/workflows/check.yml/badge.svg)](https://github.com/denoverse/lang/actions/workflows/check.yml)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy_me_a_coffee-222?logo=buymeacoffee\&logoColor=222\&labelColor=fd0)](https://buymeacoffee.com/christiangrete)

**deno\_lang** is a library-agnostic collection of language utilities for Deno and TypeScript — a nerdy homage to
classics like [MooTools](https://mootools.net), [jQuery](https://jquery.com) and
[mout](https://github.com/mout/mout)/[lang](https://github.com/mout/mout/tree/v1.2.4/src/lang). Check out our
[backstory][repository-history-url] if you’re curious about the history behind this package.

Sure, there are _different ways_ to do many of these things today — in most cases, TypeScript handles it statically. But
when you need type safety at runtime, this still comes in handy. That said, this project was built with love, a strong
focus on performance, and an API that’s meant to feel as idiomatic as possible. 🚀

We’re happy if you have fun with it — and yeah, we’re a little nostalgic about the good old days too.

## Getting started

### Installation

Add this package as a dependency to your project:

```sh
deno add jsr:@denoverse/lang
```

Then, import it in your code:

```ts
import { instanceOf } from "@denoverse/lang";
```

Alternatively, you can import deno\_lang via [deno.land/x](https://deno.land/x):

```ts
import { typeOf } from "https://deno.land/x/lang/mod.ts";
```

We recommend using [JSR](https://jsr.io) as the future-proof standard for imports.

### Usage

Embrace the legacy of our forefathers — now with full TypeScript support:

```ts
import { hasTag, instanceOf, isConstructor, isType, typeOf } from "@denoverse/lang";

hasTag(123, "Number"); // `true`
instanceOf(true, Boolean); // `true`, works with primitives
isConstructor(() => {}); // `false`, must be newable
typeOf(null) === "object"; // `false` - it's `"null"`

const message = "Howdy!" as unknown;

// Type Guards FTW!
if (isType(message, "string")) {
  // `message` now has type `string` in TypeScript
} else {
  // `message` is still typed as `unknown`
}
```

See [docs][repository-docs-url] for full API documentation.

## Contributing

Contributions are very welcome. Please see the [contribution guidelines](CONTRIBUTING.md) for details on how to get
involved.

## Special thanks

A big **thank you** to the [original authors](AUTHORS.md) of the libraries that inspired this project. ❤️

Thanks also to [OpenAI](https://github.com/OPENAI) and ChatGPT for providing an exceptional pair programmer that
contributed significantly to both productivity and code quality. 🦾

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-docs-url]: docs/README.md
[repository-github-url]: https://github.com/denoverse/lang
[repository-history-url]: HISTORY.md
[repository-license-url]: LICENSE
[repository-module-url]: https://deno.land/x/lang
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
