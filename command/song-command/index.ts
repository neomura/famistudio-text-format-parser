import { Line } from "../../line";

export type SongCommand = {
  readonly line: Line;
  readonly kind: `song`;
  readonly name: string;
  readonly length: unknown;
  readonly loopPoint: null | unknown;
  readonly patternLength: unknown;
  readonly beatLength: unknown;

  readonly famiStudio: null | {
    readonly noteLength: unknown;
  };

  readonly famiTracker: null | {
    readonly tempo: unknown;
    readonly speed: unknown;
  };
};
