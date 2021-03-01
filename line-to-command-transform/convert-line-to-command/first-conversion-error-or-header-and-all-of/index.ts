import { ConversionError } from "../conversion-error";

export function firstConversionErrorOrHeaderAndAllOf<
  TCombined,
  THeaderKeys extends keyof TCombined
>(
  header: Pick<TCombined, THeaderKeys>,
  variables: {
    readonly [TKey in Exclude<keyof TCombined, THeaderKeys>]:
      | ConversionError
      | TCombined[TKey];
  }
): ConversionError | TCombined {
  for (const key in variables) {
    const value = variables[key as Exclude<keyof TCombined, THeaderKeys>];

    if (value instanceof ConversionError) {
      return value;
    }
  }

  return { ...header, ...variables } as TCombined;
}
