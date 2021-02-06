import { Line } from "../../../line";
import { U4 } from "../../../u4";
import { U8 } from "../../../u8";

export type VolumeEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `volumeEnvelope`;
  readonly loop: null | U8;
  readonly release: null | U8;
  readonly values: ReadonlyArray<U4>;
};
