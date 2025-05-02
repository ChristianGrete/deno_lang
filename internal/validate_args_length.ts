export const validateArgsLength = (
  args: unknown,
  expected: number = 1,
): void => {
  const { length } = args as unknown[];

  if (length !== expected) {
    throw new TypeError(
      `Invalid number of arguments: expected ${expected}, got ${length}`,
    );
  }
};
