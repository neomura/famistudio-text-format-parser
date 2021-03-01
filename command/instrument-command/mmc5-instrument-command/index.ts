import { Line } from "../../../line";

export type Mmc5InstrumentCommand = {
  readonly line: Line;
  readonly kind: `mmc5Instrument`;
  readonly name: string;
};
