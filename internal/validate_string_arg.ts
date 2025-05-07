import { getTagLabel } from "../tag_label_of.ts";
import { getType } from "../type_of.ts";

export const validateStringArg = (name: string, value: unknown): void => {
  if (getTagLabel(value) !== "[object String]") {
    throw new TypeError(
      `Invalid argument '${name}': expected string, got ${getType(value)}`,
    );
  }
};
