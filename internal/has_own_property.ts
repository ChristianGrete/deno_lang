const { hasOwnProperty: nativeHasOwnProperty } = Object.prototype;

type HasOwnProperty = (obj: unknown, prop: PropertyKey) => boolean; // eslint-disable-line unused-imports/no-unused-vars

export const hasOwnProperty = nativeHasOwnProperty.call.bind(nativeHasOwnProperty) as HasOwnProperty;
