import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getOptionalEnum<T extends string>(
  line: Line,
  key: string,
  values: ReadonlyArray<readonly [string, T]>
): ConversionError | null | T {
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
