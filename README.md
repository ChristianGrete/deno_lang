# [deno_lang](repository-github-url)

> Also known as [@denoverse/lang](https://jsr.io/@denoverse/lang) and [x/lang](https://deno.land/x/lang).

[![JSR @denoverse](https://jsr.io/badges/@denoverse)](https://jsr.io/@denoverse)

**deno_lang** is a library-agnostic collection of language utilities for [Deno](https://deno.com) and [TypeScript](https://typescriptlang.org) — a nerdy homage to classics like [MooTools](https://mootools.net) and [mout](https://github.com/mout/mout)/[lang](https://github.com/mout/mout/tree/v1.2.4/src/lang). Check out the [history](repository-history-url) if you're curious about the backstory.

Sure, there are _different ways_ to do many of these things today. But this project was built with love, a strong focus on performance, and an API that's meant to feel as idiomatic as possible. 🚀

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

Alternatively, you can import deno_lang via [deno.land/x](https://deno.land/x):

```ts
import { typeOf } from "https://deno.land/x/lang/mod.ts";
```

That said, we recommend using [JSR](https://jsr.io) as the future-proof standard for imports.

### Usage

Embrace the legacy of our forefathers — now with full TypeScript support:

```ts
import { hasTag, instanceOf, isConstructor, isType, typeOf } from "@denoverse/lang";

hasTag(123, "Number"); // true
instanceOf(true, Boolean); // true, works with primitives
isConstructor(() => {}); // false, must be newable
typeOf(null) === "object"; // false - it's "null"

const message = "Howdy!" as unknown;

// Type Guards FTW!
if (isType(message, "string")) {
  // message is now typed as string in TypeScript
} else {
  // message is still typed as unknown
}
```

See [docs](repository-docs-url) for full API documentation.

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for [Denoverse](repository-organization-url) and [contributors](repository-contributors-url)

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-docs-url]: docs
[repository-github-url]: https://github.com/denoverse/lang
[repository-history-url]: HISTORY.md
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com