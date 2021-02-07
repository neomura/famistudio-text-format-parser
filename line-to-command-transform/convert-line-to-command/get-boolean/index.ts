import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getBoolean(
  line: Line,
  key: string,
  fallback: boolean
): ConversionError | boolean {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const value = line.attributes[key].value.trim();

    switch (value) {
      case ``:
        return fallback;

      case `False`:
        return false;

      case `True`:
        return true;

      default:
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} can only be "True" or "False" when given for line type ${JSON.stringify(
            line.type
          )}, but its value ${JSON.stringify(value)} was not recognized`
        );
    }
  } else {
    return fallback;
  }
}
