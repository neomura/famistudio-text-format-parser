import { Line } from "../../../line";
import { U2 } from "../../../u2";
import { U8 } from "../../../u8";

export type DutyCycleEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `dutyCycleEnvelope`;
  readonly loop: null | U8;
  readonly values: ReadonlyArray<U2>;
};
