const { defineProperty } = Object;

export const unsetPrototype = (func: unknown): void => {
  if (typeof func === "function") {
    defineProperty(func, "prototype", { configurable: false, enumerable: false, value: null, writable: false });
  }
};
