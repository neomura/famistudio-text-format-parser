import { Line } from "../../../../line";
import { Vrc7Patch } from "../../../../vrc7-patch";

export type PatchVrc7InstrumentCommand = {
  readonly line: Line;
  readonly kind: `patchVrc7InstrumentCommand`;
  readonly name: string;
  readonly patch: Vrc7Patch;
};
