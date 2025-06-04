import { getType } from "../type_of.ts";

export const validateStrictOpt = (value: unknown): boolean => getType(value) === "boolean" ? value as boolean : false;
