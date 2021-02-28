import { Line } from "../../line";
import { S7 } from "../../s7";
import { U8 } from "../../u8";

export type ArpeggioCommand = {
  readonly line: Line;
  readonly kind: `arpeggio`;
  readonly name: string;
  readonly loop: U8;
  readonly values: ReadonlyArray<S7>;
};
