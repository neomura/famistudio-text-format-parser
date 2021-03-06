import { Line } from "../../../line";
import { ConversionError } from "../conversion-error";

export function getMandatoryArray<T extends number>(
  line: Line,
  key: string,
  minimum: number,
  maximum: number,
  minimumLength: number,
  maximumLength: number
): ConversionError | ReadonlyArray<T> {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const output: T[] = [];

    const text = line.attributes[key].value;

    if (text.trim() === ``) {
      return new ConversionError(
        line,
        `Attribute ${JSON.stringify(
          key
        )} is mandatory for line type ${JSON.stringify(
          line.type
        )}, but it was not given`
      );
    } else {
      const values = text.split(`,`);

      if (values.length < minimumLength) {
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} cannot contain fewer than ${minimumLength} items for line type ${JSON.stringify(
            line.type
          )}, but only ${values.length} were given`
        );
      } else if (values.length > maximumLength) {
        return new ConversionError(
          line,
          `Attribute ${JSON.stringify(
            key
          )} cannot contain more than ${maximumLength} items for line type ${JSON.stringify(
            line.type
          )}, but ${values.length} were given`
        );
      } else {
        for (const fragment of values) {
          if (/^\s*[+-]?\d+\s*$/.test(fragment)) {
            const number = parseInt(fragment);

            if (number < minimum) {
              return new ConversionError(
                line,
                `Attribute ${JSON.stringify(
                  key
                )} must contain values greater than or equal to ${minimum} for line type ${JSON.stringify(
                  line.type
                )}, but one of its values is ${number}`
              );
            } else if (number > maximum) {
              return new ConversionError(
                line,
                `Attribute ${JSON.stringify(
                  key
                )} must contain values less than or equal to ${maximum} for line type ${JSON.stringify(
                  line.type
                )}, but one of its values is ${number}`
              );
            } else {
              output.push((number || 0) as T);
            }
          } else {
            return new ConversionError(
              line,
              `Attribute ${JSON.stringify(
                key
              )} is mandatory for line type ${JSON.stringify(
                line.type
              )}, but its value does not contain an array of integers`
            );
          }
        }

        return output;
      }
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
