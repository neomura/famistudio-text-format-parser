import { Line } from "../../../line";
import { N163Wave } from "../../../n163-wave";

export type N163WaveEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `n163WaveEnvelope`;
  readonly values: N163Wave;
};
