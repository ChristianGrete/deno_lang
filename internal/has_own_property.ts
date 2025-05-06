const { hasOwnProperty: nativeHasOwnProperty } = Object.prototype;

type HasOwnProperty = (obj: unknown, prop: PropertyKey) => boolean;

export const hasOwnProperty = nativeHasOwnProperty.call.bind(
  nativeHasOwnProperty,
) as HasOwnProperty;
