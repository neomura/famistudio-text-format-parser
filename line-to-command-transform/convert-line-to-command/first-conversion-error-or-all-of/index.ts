import { ConversionError } from "../conversion-error";

export function firstConversionErrorOrAllOf<TVariables>(
  variables: {
    readonly [TKey in keyof TVariables]: ConversionError | TVariables[TKey];
  }
): ConversionError | TVariables {
  for (const key in variables) {
    const value = variables[key];

    if (value instanceof ConversionError) {
      return value;
    }
  }

  return variables as TVariables;
}
