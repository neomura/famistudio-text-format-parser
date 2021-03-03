import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getMandatoryEnum<T>(
  line: Line,
  key: string,
  values: ReadonlyArray<readonly [string, T]>
): ConversionError | T {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const value = line.attributes[key].value.trim();

    if (value !== ``) {
      const match = values.find((option) => option[0] === value);

      if (match !== undefined) {
        return match[1];
      } else {
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} can only be one of ${values
            .map((option) => JSON.stringify(option[0]))
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
