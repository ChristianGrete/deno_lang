# [lang](mod.md)/[type\_of](../type_of.ts)

> Provides a reliable and consistent way to determine a value's runtime type.

Determines the runtime type of a value using tag-based detection and returns a normalized string representing its basic
TypeScript type, as far as distinguishable at runtime. This includes type strings like `"null"`, `"array"`, or `"map"`,
which are not reliably detected via JavaScript's native `typeof`.

## Members

- [`typeOf`](#function-typeof)
- [`type Type`](#type-type)
- [`type BuiltinType`](#type-builtintype)
- [`type ExtendedType`](#type-extendedtype)
- [`type NullOrUndefinedType`](#type-nullorundefinedtype)
- [`typeByTagLabel`](#constant-typebytaglabel)

## Function: `typeOf()`

Determines the runtime type of a value.

```ts
function typeOf(value: unknown): Type;
```

### Example

```ts
import { typeOf } from "@denoverse/lang";

typeOf([]); // "array"
typeOf(null); // "null"
typeOf(() => {}); // "function"
typeOf("hi"); // "string"
```

### Arguments

| Argument | Type      | Default | Description         |
| -------- | --------- | ------- | ------------------- |
| `value`  | `unknown` | –       | The value to check. |

### Returns

`Type` — A string representing the value's runtime type.

## Type: `Type`

Any runtime type as returned by [`typeOf()`](#function-typeof).

```ts
type Type;
```

## Type: `BuiltinType`

A built-in runtime type as defined in the ECMAScript specification.

```ts
type BuiltinType;
```

## Type: `ExtendedType`

An additional runtime type supported in modern JavaScript.

```ts
type ExtendedType;
```

## Type: `NullOrUndefinedType`

A runtime type for `null` or `undefined`.

```ts
type NullOrUndefinedType;
```

## Constant: `typeByTagLabel`

Mapping from tag label strings to runtime type strings.

Used by [`typeOf()`](#function-typeof).

```ts
const typeByTagLabel: Record<TagLabel, Type>;
```

## See also

- [`mootools-core@1.2.6/Core/Core.$type`](https://github.com/mootools/mootools-core/blob/1.2.6/Source/Core/Core.js#L259)
- [`mootools-core@1.6.0/Core/Core.typeOf`](https://github.com/mootools/mootools-core/blob/1.6.0/Source/Core/Core.js#L32)
- [`jquery@3.7.1/core.toType`](https://github.com/jquery/jquery/blob/3.7.1/src/core/toType.js)
- [`mout-lang-type@0.6.0/lang/typeOf`](https://github.com/ChristianGrete/mout-lang-type/blob/v0.6.0/src/lang/typeOf.js)

---

Copyright © 2025 ([MIT][repository-license-url]) [Christian Grete][repository-owner-url] for
[Denoverse][repository-organization-url] and [contributors][repository-contributors-url]

[repository-contributors-url]: https://github.com/denoverse/lang/graphs/contributors
[repository-license-url]: LICENSE
[repository-organization-url]: https://github.com/denoverse
[repository-owner-url]: https://christiangrete.com
