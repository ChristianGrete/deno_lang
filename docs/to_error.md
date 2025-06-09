# [lang](mod.md)/[to\_error](../to_error.ts)

> Provides a safe and type-aware way to coerce any value into an error object.

Coerces primitives, plain objects, and error objects into usable error instances.

A configuration object can be used to select a custom error constructor, allowing the use of specific error types like
`TypeError`, `RangeError`, or others.

A strict mode is also available to enforce descriptive fallback messages instead of generic or empty ones when input
values are non-standard.

Symbols are passed through to the constructor and may result in a `TypeError`, depending on how it handles symbol input.

---

## Members

- [`toError`](#function-toerror)
- [`type ToErrorOptions`](#interface-toerroroptions)

---

## Function: `toError()`

Converts a value into an error object.

```ts
function toError<ErrorInstance extends Error = Error>(
  value: unknown,
  options?: ToErrorOptions<ErrorInstance>,
): ErrorInstance;
```

### Example

```ts
import { toError } from "@denoverse/lang/to_error";

toError(new Error("fail")); // Error: fail
toError("fail"); // Error: fail
toError({ cause: { exitCode: 1 }, message: "fail" }); // Error: fail
toError("fail", { strict: true }); // Error: Error coerced from string
toError<TypeError>("invalid", { errorConstructor: TypeError }); // TypeError: invalid
```

### Arguments

| Argument   | Type                            | Default                                      | Description                       |
| ---------- | ------------------------------- | -------------------------------------------- | --------------------------------- |
| `value`    | `unknown`                       | –                                            | The value to convert.             |
| `options?` | `ToErrorOptions<ErrorInstance>` | `{ errorConstructor: Error, strict: false }` | An optional configuration object. |

### Returns

`ErrorInstance` — The resulting error object.

### Type parameters

| Parameter       | Constraint | Default | Description                                      |
| --------------- | ---------- | ------- | ------------------------------------------------ |
| `ErrorInstance` | `Error`    | `Error` | The error type to return, defaulting to `Error`. |

### Throws

| Error       | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `TypeError` | When `value` is a symbol and the error constructor cannot handle it. |

---

## Interface: `ToErrorOptions`

Represents a configuration options object.

Used to configure how values are converted in [`toError()`](#function-toerror).

```ts
interface ToErrorOptions<ErrorInstance extends Error> {
  errorConstructor?: ErrorConstructorOf<ErrorInstance>;
  strict?: boolean;
}
```

### Properties

| Property            | Type                                | Default | Description                                                 |
| ------------------- | ----------------------------------- | ------- | ----------------------------------------------------------- |
| `errorConstructor?` | `ErrorConstructorOf<ErrorInstance>` | `Error` | The constructor to create the error, defaulting to `Error`. |
| `strict?`           | `boolean`                           | `false` | Whether to enforce descriptive fallback messages.           |

### Type parameters

| Parameter       | Constraint | Default | Description                    |
| --------------- | ---------- | ------- | ------------------------------ |
| `ErrorInstance` | `Error`    | –       | The error type to be returned. |

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
