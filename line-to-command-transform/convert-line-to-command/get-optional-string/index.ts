import { Line } from "../../../line";

export function getOptionalString(line: Line, key: string): null | string {
  if (Object.prototype.hasOwnProperty.call(line.attributes, key)) {
    const value = line.attributes[key].value.trim();

    if (value !== ``) {
      return value;
    } else {
      return null;
    }
  } else {
    return null;
  }
}
