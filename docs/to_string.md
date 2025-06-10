# [lang](mod.md)/[to\_string](../to_string.ts)

> Provides a safe and consistent way to convert values into strings.

Converts all supported values into string representations in a safe and consistent manner. Nullish values are normalized
to an empty string, while all other inputs are handled using JavaScript’s native `String()` behavior, including support
for boxed primitives and symbol wrappers.

## Members

- [`toString`](#function-tostring)

## Function: `toString()`

Converts a value into a string.

```ts
function toString(value: unknown): string;
```

### Example

```ts
import { toString } from "@denoverse/lang";

toString(null); // ""
toString(undefined); // ""
toString(42); // "42"
toString(true); // "true"
```

### Arguments

| Argument | Type      | Default | Description           |
| -------- | --------- | ------- | --------------------- |
| `value`  | `unknown` | –       | The value to convert. |

### Returns

`string` — The resulting string.

## See also

- [`mout@1.2.4/lang/toString`](https://github.com/mout/mout/blob/v1.2.4/src/lang/toString.js)

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
