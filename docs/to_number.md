# [lang](mod.md)/[to\_number](../to_number.ts)

> Provides a safe and consistent way to convert values into numbers.

Converts primitives, nullish values, and other common inputs into numbers using a combination of type-aware coercion and
`parseFloat()`. Strings with numeric content are parsed, boolean `true` becomes `1`, and falsy values like `false`,
`null`, or `""` become `0`.

A strict mode is available to disable lossy coercion and enforce exact numeric syntax. Invalid or non-numeric input
results in `NaN`.

---

## Members

- [`toNumber`](#function-tonumber)
- [`interface ToNumberOptions`](#interface-tonumberoptions)

---

## Function: `toNumber()`

Converts a value into a number.

```ts
function toNumber(value: unknown, options?: ToNumberOptions): number;
```

### Example

```ts
import { toNumber } from "@denoverse/lang/to_number";

toNumber("123"); // 123
toNumber("123abc"); // 123
toNumber("123abc", { strict: true }); // NaN
toNumber([4]); // NaN
toNumber(null); // 0
```

### Arguments

| Argument   | Type              | Default             | Description                       |
| ---------- | ----------------- | ------------------- | --------------------------------- |
| `value`    | `unknown`         | –                   | The value to convert.             |
| `options?` | `ToNumberOptions` | `{ strict: false }` | An optional configuration object. |

### Returns

`number` — The resulting number, or `NaN` if conversion isn’t safe.

---

## Interface: `ToNumberOptions`

Represents a configuration options object.

Used to configure how values are converted in [`toNumber()`](#function-tonumber).

```ts
interface ToNumberOptions {
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
