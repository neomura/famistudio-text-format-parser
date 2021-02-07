import { Line } from "../../../line";
import { U4 } from "../../../u4";
import { ConversionError } from "../conversion-error";

const characters = `0123456789abcdef`;

export function getMandatoryHexString(
  line: Line,
  key: string
): ConversionError | ReadonlyArray<U4> {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const text = line.attributes[key].value.trim().toLowerCase();

    if (/^[0-9a-f]+$/.test(text)) {
      const output: number[] = [];

      for (const character of text) {
        output.push(characters.indexOf(character));
      }

      return output as ReadonlyArray<U4>;
    } else {
      return new ConversionError(
        line,
        `Attribute ${JSON.stringify(
          key
        )} is mandatory for line type ${JSON.stringify(
          line.type
        )}, but its value does not contain hexadecimal characters`
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
