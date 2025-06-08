export const validateArgsLength = (args: ArrayLike<unknown>, min: number = 1, max: number = min): void => {
  const { length } = args;

  if (length < min || length > max) {
    throw new TypeError(
      `Invalid number of arguments: expected ${min}${min !== max ? ` to ${max}` : ""}, got ${length}`,
    );
  }
};
