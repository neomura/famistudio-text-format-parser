import { Line } from "../../../line";

export type ReleaseNoteCommand = {
  readonly line: Line;
  readonly kind: `release`;
  readonly time: unknown;
};
