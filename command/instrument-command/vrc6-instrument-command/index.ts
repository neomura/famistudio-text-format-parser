import { Line } from "../../../line";

export type Vrc6InstrumentCommand = {
  readonly line: Line;
  readonly kind: `vrc6Instrument`;
  readonly name: string;
};
