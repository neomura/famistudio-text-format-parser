import { Line } from "../../line";

export type PatternCustomSettingsCommand = {
  readonly line: Line;
  readonly kind: `patternCustomSettings`;
  readonly time: unknown;
  readonly length: unknown;
  readonly famiStudio: null | {
    readonly noteLength: unknown;
    readonly beatLength: unknown;
  };
};
