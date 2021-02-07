import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getMandatoryInteger<T extends number>(
  line: Line,
  key: string,
  minimum: number,
  maximum: number
): ConversionError | T {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const text = line.attributes[key].value.trim();

    if (/^[+-]?\d+$/.test(text)) {
      const number = parseInt(text);

      if (number < minimum) {
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} must be greater than or equal to ${minimum} for line type ${JSON.stringify(
            line.type
          )}, but its value is ${number}`
        );
      } else if (number > maximum) {
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} must be less than or equal to ${maximum} for line type ${JSON.stringify(
            line.type
          )}, but its value is ${number}`
        );
      } else {
        return (number || 0) as T;
      }
    } else {
      return new ConversionError(
        line,
        `Attribute ${JSON.stringify(
          key
        )} is mandatory for line type ${JSON.stringify(
          line.type
        )}, but its value does not contain an integer`
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
