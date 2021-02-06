import { Line } from "../../../line";

export type RP2A03InstrumentCommand = {
  readonly line: Line;
  readonly kind: `rp2a03Instrument`;
  readonly name: string;
};
