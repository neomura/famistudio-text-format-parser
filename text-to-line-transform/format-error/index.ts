export class FormatError extends Error {
  constructor(
    public readonly row: number,
    public readonly column: number,
    message: string
  ) {
    super(`${message} at column ${column} of line ${row}.`);
  }
}
