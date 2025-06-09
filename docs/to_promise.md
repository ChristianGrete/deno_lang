# [lang](mod.md)/[to\_promise](../to_promise.ts)

> Provides a safe and predictable way to convert values into promise objects.

Converts native promises, thenables, and other values into promise objects. Input promises are returned unchanged, while
thenables are wrapped using `Promise.resolve()`. Primitive and non-promise values result in immediately resolved
promises.

## Members

- [`toPromise`](#function-topromise)
- [`type PromiseFrom`](#type-promisefrom)

## Function: `toPromise()`

Converts a value into a promise object.

```ts
function toPromise<Value = unknown>(value: Value): PromiseFrom<Value>;
```

### Example

```ts
import { toPromise } from "@denoverse/lang";

await toPromise(123); // 123
await toPromise(Promise.resolve("ok")); // "ok"
await toPromise(new Promise(() => {})); // still pending
await toPromise({ then: (res) => res("done") }); // "done"
```

### Arguments

| Argument | Type    | Default | Description           |
| -------- | ------- | ------- | --------------------- |
| `value`  | `Value` | –       | The value to convert. |

### Returns

`PromiseFrom<Value>` — The resulting promise object.

### Type parameters

| Parameter | Constraint | Default   | Description                                                     |
| --------- | ---------- | --------- | --------------------------------------------------------------- |
| `Value`   | –          | `unknown` | Inferred type of the `value` argument, defaulting to `unknown`. |

## Type: `PromiseFrom`

Infers the return type of [`toPromise()`](#function-topromise) based on the input type.

```ts
type PromiseFrom<Value>
```

### Type parameters

| Parameter | Constraint | Default | Description                                        |
| --------- | ---------- | ------- | -------------------------------------------------- |
| `Value`   | –          | –       | The type to unwrap if thenable, or to wrap if not. |

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
