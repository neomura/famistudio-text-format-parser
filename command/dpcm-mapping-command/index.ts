import { DpcmNoteValue } from "../../dpcm-note-value";
import { Line } from "../../line";
import { U4 } from "../../u4";

export type DpcmMappingCommand = {
  readonly line: Line;
  readonly kind: `dpcmMapping`;
  readonly note: DpcmNoteValue;
  readonly sample: string;
  readonly pitch: null | U4;
  readonly loop: boolean;
};
