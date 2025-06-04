import { isObjectLiteral } from "../is_plain_object.ts";
import { getType } from "../type_of.ts";

export const validatePlainObjArg = (name: string, value: unknown): void => {
  if (!isObjectLiteral(value)) {
    throw new TypeError(`Invalid argument '${name}': expected string, got ${getType(value)}`);
  }
};
