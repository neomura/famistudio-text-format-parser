import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getMandatoryString(
  line: Line,
  key: string
): ConversionError | string {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const value = line.attributes[key].value.trim();

    if (value !== ``) {
      return value;
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
