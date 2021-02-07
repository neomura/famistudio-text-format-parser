import { ConversionError } from "../conversion-error";

export function firstConversionErrorOr<
  TVariables extends { readonly [key: string]: unknown },
  TResult
>(
  variables: {
    readonly [TKey in keyof TVariables]: ConversionError | TVariables[TKey];
  },
  then: (
    variables: { readonly [TKey in keyof TVariables]: TVariables[TKey] }
  ) => TResult
): ConversionError | TResult {
  for (const key in variables) {
    const value = variables[key];

    if (value instanceof ConversionError) {
      return value;
    }
  }

  return then(
    variables as { readonly [TKey in keyof TVariables]: TVariables[TKey] }
  );
}
