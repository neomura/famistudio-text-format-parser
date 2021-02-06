import { Line } from "../../line";

export type PatternCommand = {
  readonly line: Line;
  readonly kind: `pattern`;
  readonly name: string;
};
