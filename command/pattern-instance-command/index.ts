import { Line } from "../../line";

export type PatternInstanceCommand = {
  readonly line: Line;
  readonly kind: `patternInstance`;
  readonly time: unknown;
  readonly pattern: string;
};
