import { Transform, TransformCallback } from "stream";
import { AttributeValue, Line } from "../line";
import { FormatError } from "./format-error";

export { FormatError } from "./format-error";

type State =
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `emptyLine`;
    }
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `carriageReturn`;
    }
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `type`;
      readonly typeColumn: number;
      readonly type: string;
    }
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `betweenAttributes`;
      readonly typeColumn: number;
      readonly type: string;
      readonly attributes: {
        readonly [key: string]: AttributeValue;
      };
    }
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `key`;
      readonly typeColumn: number;
      readonly type: string;
      readonly attributes: {
        readonly [key: string]: AttributeValue;
      };
      readonly keyColumn: number;
      readonly key: string;
    }
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `afterKey`;
      readonly typeColumn: number;
      readonly type: string;
      readonly attributes: {
        readonly [key: string]: AttributeValue;
      };
      readonly keyColumn: number;
      readonly key: string;
    }
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `beforeValue`;
      readonly typeColumn: number;
      readonly type: string;
      readonly attributes: {
        readonly [key: string]: AttributeValue;
      };
      readonly keyColumn: number;
      readonly key: string;
    }
  | {
      readonly row: number;
      readonly column: number;
      readonly kind: `value`;
      readonly typeColumn: number;
      readonly type: string;
      readonly attributes: {
        readonly [key: string]: AttributeValue;
      };
      readonly keyColumn: number;
      readonly key: string;
      readonly valueColumn: number;
      readonly value: string;
    };

export class TextToLineTransform extends Transform {
  private state: State = {
    row: 1,
    column: 0,
    kind: `emptyLine`,
  };

  constructor() {
    super({ readableObjectMode: true, decodeStrings: false });
  }

  _transform(
    chunk: unknown,
    encoding: BufferEncoding,
    callback: TransformCallback
  ): void {
    // If a buffer is recieved, this is "buffer" - not the encoding of the string within the buffer.
    encoding;

    let stringChunk: string;

    if (typeof chunk === `string`) {
      stringChunk = chunk;
    } else {
      stringChunk = (chunk as Buffer).toString();
    }

    const lines = [];

    for (const character of stringChunk) {
      const result = this.parse(character);

      if (result instanceof Error) {
        callback(result, null);

        return;
      } else {
        this.state = result.state;

        if (result.line !== null) {
          lines.push(result.line);
        }
      }
    }

    callback(null, lines.length === 0 ? null : lines);
  }

  _flush(callback: TransformCallback): void {
    const result = this.parse(`\n`);

    if (result instanceof Error) {
      callback(result, null);

      // Not sure why this is necessary to close the stream in this specific case, but it is.
      this.emit(`close`);
    } else {
      callback(null, result.line === null ? null : [result.line]);
    }
  }

  parse(
    character: string
  ):
    | Error
    | {
        readonly state: State;
        readonly line: null | Line;
      } {
    let row: number;
    let column: number;

    switch (character) {
      case `\n`:
        if (this.state.kind === `carriageReturn`) {
          return {
            state: {
              ...this.state,
              kind: `emptyLine`,
            },
            line: null,
          };
        } else {
          row = this.state.row + 1;
          column = 0;
        }
        break;

      case `\r`:
        row = this.state.row + 1;
        column = 0;
        break;

      default:
        row = this.state.row;
        column = this.state.column + 1;
        break;
    }

    switch (this.state.kind) {
      case `emptyLine`:
      case `carriageReturn`:
        if (character.trim()) {
          return {
            state: {
              ...this.state,
              row,
              column,
              kind: `type`,
              typeColumn: column,
              type: character,
            },
            line: null,
          };
        } else {
          return {
            state: {
              ...this.state,
              row,
              column,
              kind: character === `\r` ? `carriageReturn` : `emptyLine`,
            },
            line: null,
          };
        }

      case `type`:
        switch (character) {
          case `\n`:
          case `\r`:
            return {
              state: {
                ...this.state,
                row,
                column,
                kind: character === `\r` ? `carriageReturn` : `emptyLine`,
              },
              line: {
                row: this.state.row,
                type: this.state.type,
                typeColumn: this.state.typeColumn,
                attributes: {},
              },
            };

          default:
            if (character.trim()) {
              return {
                state: {
                  ...this.state,
                  row,
                  column,
                  kind: `type`,
                  type: `${this.state.type}${character}`,
                },
                line: null,
              };
            } else {
              return {
                state: {
                  ...this.state,
                  row,
                  column,
                  kind: `betweenAttributes`,
                  attributes: {},
                },
                line: null,
              };
            }
        }

      case `betweenAttributes`:
        switch (character) {
          case `\n`:
          case `\r`:
            return {
              state: {
                ...this.state,
                row,
                column,
                kind: character === `\r` ? `carriageReturn` : `emptyLine`,
              },
              line: {
                row: this.state.row,
                type: this.state.type,
                typeColumn: this.state.typeColumn,
                attributes: this.state.attributes,
              },
            };

          case `"`:
          case `=`:
            return new FormatError(row, column, `Missing key`);

          default:
            if (character.trim()) {
              return {
                state: {
                  ...this.state,
                  row,
                  column,
                  kind: `key`,
                  keyColumn: column,
                  key: character,
                },
                line: null,
              };
            } else {
              return {
                state: {
                  ...this.state,
                  row,
                  column,
                },
                line: null,
              };
            }
        }

      case `key`:
        switch (character) {
          case `\n`:
          case `\r`:
            return new FormatError(
              this.state.row,
              this.state.column,
              `Unexpected line break during key`
            );

          case `=`:
            if (
              Object.prototype.hasOwnProperty.call(
                this.state.attributes,
                this.state.key
              )
            ) {
              return new FormatError(
                this.state.row,
                this.state.keyColumn,
                `Attribute ${JSON.stringify(
                  this.state.key
                )} declared multiple times on the same line (previously at column ${
                  this.state.attributes[this.state.key].keyColumn
                })`
              );
            }

            return {
              state: {
                ...this.state,
                row,
                column,
                kind: `beforeValue`,
              },
              line: null,
            };

          default:
            if (character.trim()) {
              return {
                state: {
                  ...this.state,
                  row,
                  column,
                  key: `${this.state.key}${character}`,
                },
                line: null,
              };
            } else {
              if (
                Object.prototype.hasOwnProperty.call(
                  this.state.attributes,
                  this.state.key
                )
              ) {
                return new FormatError(
                  this.state.row,
                  this.state.keyColumn,
                  `Attribute ${JSON.stringify(
                    this.state.key
                  )} declared multiple times on the same line (previously at column ${
                    this.state.attributes[this.state.key].keyColumn
                  })`
                );
              }

              return {
                state: {
                  ...this.state,
                  row,
                  column,
                  kind: `afterKey`,
                },
                line: null,
              };
            }
        }

      case `afterKey`:
        switch (character) {
          case `\n`:
          case `\r`:
            return new FormatError(
              this.state.row,
              this.state.column,
              `Unexpected line break after key`
            );

          case `=`:
            return {
              state: {
                ...this.state,
                row,
                column,
                kind: `beforeValue`,
              },
              line: null,
            };

          default:
            if (character.trim()) {
              return new FormatError(
                this.state.row,
                this.state.column,
                `Unexpected character ${JSON.stringify(character)} after key`
              );
            } else {
              return {
                state: {
                  ...this.state,
                  row,
                  column,
                },
                line: null,
              };
            }
        }

      case `beforeValue`:
        switch (character) {
          case `\n`:
          case `\r`:
            return new FormatError(
              this.state.row,
              this.state.column,
              `Unexpected line break after key`
            );

          case `"`:
            return {
              state: {
                ...this.state,
                row,
                column,
                kind: `value`,
                valueColumn: column + 1,
                value: ``,
              },
              line: null,
            };

          default:
            if (character.trim()) {
              return new FormatError(
                row,
                column,
                `Unexpected character ${JSON.stringify(character)} before value`
              );
            } else {
              return {
                state: {
                  ...this.state,
                  row,
                  column,
                },
                line: null,
              };
            }
        }

      case `value`:
        switch (character) {
          case `\n`:
          case `\r`:
            return new FormatError(
              this.state.row,
              this.state.column,
              `Unexpected line break during value`
            );

          case `"`:
            return {
              state: {
                ...this.state,
                row,
                column,
                kind: `betweenAttributes`,
                attributes: {
                  ...this.state.attributes,
                  [this.state.key]: {
                    keyColumn: this.state.keyColumn,
                    valueColumn: this.state.valueColumn,
                    value: this.state.value,
                  },
                },
              },
              line: null,
            };

          default:
            return {
              state: {
                ...this.state,
                row,
                column,
                value: `${this.state.value}${character}`,
              },
              line: null,
            };
        }
    }
  }
}
