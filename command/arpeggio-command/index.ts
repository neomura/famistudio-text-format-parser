import { Line } from "../../line";
import { S7 } from "../../s7";
import { U8 } from "../../u8";

export type ArpeggioCommand = {
  readonly line: Line;
  readonly kind: `arpeggio`;
  readonly name: string;
  readonly length: U8;
  readonly loopPoint: unknown;
  readonly values: ReadonlyArray<S7>;
};
