import { Line } from "../../../line";

export type StopNoteCommand = {
  readonly line: Line;
  readonly kind: `stop`;
  readonly time: unknown;
};
