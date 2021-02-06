import { Line } from "../../../line";
import { U4 } from "../../../u4";

export type N163WaveEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `n163WaveEnvelope`;
  readonly values: readonly [
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4,
    U4
  ];
};
