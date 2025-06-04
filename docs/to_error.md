# lang/to\_error

> Utility module for converting a value into an error object.

Converts unknown input into a proper `Error` object. Supports primitive values, error-like objects, and native error
instances.

In strict mode, non-error input is wrapped with descriptive fallback messages. Symbols are not supported and throw a
`TypeError`. The optional `options` object accepts only valid values and silently falls back to safe defaults for
unknown or invalid types.

---

## Members

- [`toError`](#function-toerror)
- [`type ToErrorOptions`](#interface-toerroroptions)
- [`type ErrorConstructorOf`](#interface-errorconstructorof)

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
toError({ message: "fail" }); // Error: fail
toError(Symbol()); // throws TypeError
toError("fail", { strict: true }); // Error: Error coerced from string
toError<TypeError>("invalid", { errorConstructor: TypeError }); // TypeError: invalid
```

### Arguments

| Argument   | Type                            | Default value                                | Description                       |
| ---------- | ------------------------------- | -------------------------------------------- | --------------------------------- |
| `value`    | `unknown`                       | _Required_                                   | The value to convert.             |
| `options?` | `ToErrorOptions<ErrorInstance>` | `{ errorConstructor: Error, strict: false }` | An optional configuration object. |

### Returns

`ErrorInstance` - The resulting error object.

### Type parameters

| Type parameter  | Default value | Description                                |
| --------------- | ------------- | ------------------------------------------ |
| `ErrorInstance` | `Error`       | An optional type of error object returned. |

### Throws

| Error       | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `TypeError` | If `value` is a symbol (not supported by error constructors). |

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

| Property            | Type                                | Default value | Description                                              |
| ------------------- | ----------------------------------- | ------------- | -------------------------------------------------------- |
| `errorConstructor?` | `ErrorConstructorOf<ErrorInstance>` | `Error`       | An optional error constructor to use (e.g. `TypeError`). |
| `strict?`           | `boolean`                           | `false`       | Whether to enforce descriptive fallback messages.        |

### Type parameters

| Type parameter  | Default value | Description                     |
| --------------- | ------------- | ------------------------------- |
| `ErrorInstance` | _Required_    | The error object to be created. |

---

## Interface: `ErrorConstructorOf`

Represents the native `Error` constructor and its subclasses.

Mimics the built-in `ErrorConstructor`, but allows returning a specific error type like `TypeError` or `RangeError`
while retaining static members.

Used as return type by [`toError()`](#function-toerror).

```ts
interface ErrorConstructorOf<ErrorInstance extends Error> extends Omit<ErrorConstructor, "new"> {
  new (message?: string, options?: ErrorOptions): ErrorInstance;
}
```

### Type parameters

| Type parameter  | Default value | Description                     |
| --------------- | ------------- | ------------------------------- |
| `ErrorInstance` | _Required_    | The error object to be created. |

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
