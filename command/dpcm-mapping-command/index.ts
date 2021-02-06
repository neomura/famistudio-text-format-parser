import { DpcmNoteValue } from "../../dpcm-note-value";
import { Line } from "../../line";

export type DpcmMappingCommand = {
  readonly line: Line;
  readonly kind: `dpcmMapping`;
  readonly note: DpcmNoteValue;
  readonly sample: string;
  readonly pitch: null | unknown;
  readonly loop: boolean;
};
