# The History Behind [deno_lang][repository-github-url]

A few words from the project's originator, [Christian Grete][repository-owner-profile], about the background and
motivation behind this project:

Back when Internet Explorer 6 was still relevant — a browser that couldn’t even render transparent PNGs properly — I
stumbled across a project called “[MooTools](https://mootools.net)”. It was my first serious encounter with JavaScript,
or any programming language at all. That random discovery ended up shaping the way I think about code to this day.

While others were writing [jQuery](https://jquery.com) chains that read like sentences — designed to be accessible to
designers — I spent my free time building reusable, object-oriented classes and modules. MooTools was way ahead of its
time, and many of its core ideas have since become part of the modern JavaScript standard. I have deeply nostalgic
memories of that era, and of long nights joyfully soaking up every bit of knowledge I could — just to build a clean
image slider that could be instantiated multiple times on the same page.

With AMD and [RequireJS](https://requirejs.org), modularity reached a new level, and the
“[mout](https://github.com/mout)” project felt to me like the natural successor — a glimpse of the future.

But things changed quickly. New ECMAScript specs were taking shape. Tools like [Modernizr](https://modernizr.com) and
[Babel](https://babeljs.io) made it possible to use tomorrow’s features today, and TypeScript elevated the entire
JavaScript ecosystem to a new level. Development itself became smoother, even though the learning curve for newcomers
had steepened.

Without even realizing it, an era came to an end. The diverse philosophies and competing approaches that once coexisted
gradually faded away. These days, we spin up a [Vite](https://vite.dev) app, write some JSX, patch a few npm
vulnerabilities — and somehow, everything works. But somehow, it also feels a little… soulless.

Then [Deno](https://deno.com) came along. And with it, that same gut feeling I hadn’t felt in years. A fresh take. A
path that was trying to learn from past mistakes and do things better. I was instantly hooked. The only problem: I
didn’t really know what to build with it. Until I remembered mout.

This project is the result of many long, curious, perfectionism-driven evenings — brought to life together with ChatGPT
as both a conceptual and operational partner.

The idea is simple: provide a library that brings runtime type safety to modern JavaScript, backed by clear
documentation and an idiomatic API. A small toolkit of utilities that act as Type Guards in TypeScript — for when static
typing isn’t enough.

The plan was to publish the package under [deno.land/x/lang](https://deno.land/x/lang), complementing Deno’s `std`
library without feeling like just another third-party package. At the same time, it should work seamlessly in modern
browsers, offering full compatibility across environments.

As the project evolved, new insights followed. The trend was clearly shifting toward [JSR](https://jsr.io) as the future
of package distribution — which meant we’d need a namespace. That led to the idea of creating a dedicated GitHub
organization to serve as a new identity: [Denoverse][repository-organization-url].

More projects are planned to follow under this namespace and organization.

I hope you enjoy working with **deno_lang** — and I’m genuinely happy about every contribution. ❤️

Feel free to check out the [contribution guidelines][repositoriy-contributing-url] to learn more about how you can get
involved.

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repositoriy-contributing-url]: CONTRIBUTING.md
[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-github-url]: https://github.com/denoverse/lang
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-profile]: https://github.com/ChristianGrete
[repository-owner-url]: https://christiangrete.com
