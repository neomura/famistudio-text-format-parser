import { Line } from "../../../line";
import { S7 } from "../../../s7";
import { U8 } from "../../../u8";

export type PitchEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `pitchEnvelope`;
  readonly loop: null | U8;
  readonly release: null | U8;
  readonly values: ReadonlyArray<S7>;
  readonly relative: boolean;
};
