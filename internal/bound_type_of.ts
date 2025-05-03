import { type Type, typeOf } from "../type_of.ts";

type BoundTypeOf = (...args: unknown[]) => Type;

export const boundTypeOf = Function.prototype.apply.bind(
  typeOf,
  null,
) as BoundTypeOf;
