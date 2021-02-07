import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getMandatoryEnum<T extends string>(
  line: Line,
  key: string,
  values: ReadonlyArray<T>
): ConversionError | T {
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
            .join(`, `)} for line type ${JSON.stringify(
            line.type
          )}, but its value ${JSON.stringify(value)} was not recognized`
        );
      }
    } else {
      return new ConversionError(
        line,
        `Attribute ${JSON.stringify(
          key
        )} is mandatory for line type ${JSON.stringify(
          line.type
        )}, but its value does not contain text`
      );
    }
  } else {
    return new ConversionError(
      line,
      `Attribute ${JSON.stringify(
        key
      )} is mandatory for line type ${JSON.stringify(
        line.type
      )}, but it was not given`
    );
  }
}
