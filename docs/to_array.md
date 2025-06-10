# [lang](mod.md)/[to\_array](../to_array.ts)

> Provides a safe and type-aware way to convert any value into an array.

Converts array-like structures into real arrays and wraps everything else into a single-element array. Unlike
`Array.from()`, it won’t throw on `null`, plain objects, or functions — making it safe for unpredictable inputs.

## Members

- [`toArray`](#function-toarray)
- [`type ArrayFrom`](#type-arrayfrom)

## Function: `toArray()`

Converts a value into an array.

```ts
function toArray<Value = unknown>(value: Value): ArrayFrom<Value>;
```

### Example

```ts
import { toArray } from "@denoverse/lang";

toArray([1, 2, 3]); // [1, 2, 3]
toArray("hi"); // ["h", "i"]
toArray({ 0: "a", 1: "b", length: 2 }); // ["a", "b"]
toArray(null); // []
```

### Arguments

| Argument | Type    | Default | Description           |
| -------- | ------- | ------- | --------------------- |
| `value`  | `Value` | –       | The value to convert. |

### Returns

`ArrayFrom<Value>` — The resulting array.

### Type parameters

| Parameter | Constraint | Default   | Description                                                     |
| --------- | ---------- | --------- | --------------------------------------------------------------- |
| `Value`   | –          | `unknown` | Inferred type of the `value` argument, defaulting to `unknown`. |

## Type: `ArrayFrom`

Infers the return type of [`toArray()`](#function-toarray) based on the input type.

```ts
type ArrayFrom<Value>;
```

### Type parameters

| Parameter | Constraint | Default | Description                                          |
| --------- | ---------- | ------- | ---------------------------------------------------- |
| `Value`   | –          | –       | The type to unwrap if array-like, or to wrap if not. |

## See also

- [`jquery@3.7.1/core.makeArray`](https://github.com/jquery/jquery/blob/3.7.1/src/core.js#L309)
- [`mout@1.2.4/lang/toArray`](https://github.com/mout/mout/blob/v1.2.4/src/lang/toArray.js)

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
