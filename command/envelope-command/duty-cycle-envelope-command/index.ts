import { Line } from "../../../line";
import { U2 } from "../../../u2";
import { U8 } from "../../../u8";

export type DutyEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `dutyEnvelope`;
  readonly loop: null | U8;
  readonly values: ReadonlyArray<U2>;
};
