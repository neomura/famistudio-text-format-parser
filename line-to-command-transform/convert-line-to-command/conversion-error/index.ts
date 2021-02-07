import { Line } from "../../../line";

export class ConversionError extends Error {
  constructor(public readonly line: Line, message: string) {
    super(`${message} on line ${line.row}.`);
  }
}
