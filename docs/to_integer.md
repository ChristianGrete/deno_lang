# [lang](mod.md)/[to\_integer](../to_integer.ts)

> Provides a safe and consistent way to convert values into integers.

Converts primitives, nullish values, and other common inputs into lower-bound integers using a combination of type-aware
coercion and `Math.floor()`. Strings with numeric content are parsed, boolean `true` becomes `1`, and falsy values like
`false`, `null`, or `""` become `0`.

A strict mode is available to disable lossy coercion and enforce exact numeric syntax. Invalid or non-numeric input
results in `NaN`.

---

## Members

- [`toInteger`](#function-tointeger)
- [`interface ToIntegerOptions`](#interface-tointegeroptions)

---

## Function: `toInteger()`

Converts a value into an integer.

```ts
function toInteger(value: unknown, options?: ToIntegerOptions): number;
```

### Example

```ts
import { toInteger } from "@denoverse/lang";

toInteger("42.9"); // 42
toInteger("10.1", { strict: true }); // 10
toInteger(null); // 0
toInteger([4]); // NaN
```

### Arguments

| Argument   | Type               | Default             | Description                       |
| ---------- | ------------------ | ------------------- | --------------------------------- |
| `value`    | `unknown`          | –                   | The value to convert.             |
| `options?` | `ToIntegerOptions` | `{ strict: false }` | An optional configuration object. |

### Returns

`number` — The resulting integer, or `NaN` if conversion isn’t safe.

---

## Interface: `ToIntegerOptions`

Represents a configuration options object.

Used to configure how values are converted in [`toInteger()`](#function-tointeger).

```ts
interface ToIntegerOptions {
  strict?: boolean;
}
```

### Properties

| Property  | Type      | Default | Description                              |
| --------- | --------- | ------- | ---------------------------------------- |
| `strict?` | `boolean` | `false` | Whether to enforce exact numeric syntax. |

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
