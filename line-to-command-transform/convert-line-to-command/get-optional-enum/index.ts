import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getOptionalEnum<T extends string>(
  line: Line,
  key: string,
  values: ReadonlyArray<T>
): ConversionError | null | T {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const value = line.attributes[key].value.trim();

    if (value !== ``) {
      if ((values as ReadonlyArray<string>).includes(value)) {
        return value as T;
      } else {
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} can only be one of ${values
            .map((value) => JSON.stringify(value))
            .join(`, `)} when given for line type ${JSON.stringify(
            line.type
          )}, but its value ${JSON.stringify(value)} was not recognized`
        );
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
