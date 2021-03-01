import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getMandatoryIntegerEnum<T extends number>(
  line: Line,
  key: string,
  values: ReadonlyArray<T>
): ConversionError | T {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const text = line.attributes[key].value.trim();

    if (/^[+-]?\d+$/.test(text)) {
      const number = parseInt(text);

      if ((values as ReadonlyArray<number>).includes(number)) {
        return (number || 0) as T;
      } else {
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} can only be one of ${values
            .map((value) => JSON.stringify(value))
            .join(`, `)} for line type ${JSON.stringify(
            line.type
          )}, but its value ${JSON.stringify(number)} was not recognized`
        );
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
