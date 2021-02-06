import { Line } from "../../../line";
import { S7 } from "../../../s7";
import { U8 } from "../../../u8";

export type ArpeggioEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `arpeggioEnvelope`;
  readonly loop: null | U8;
  readonly values: ReadonlyArray<S7>;
};
