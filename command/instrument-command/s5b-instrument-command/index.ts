import { Line } from "../../../line";

export type S5bInstrumentCommand = {
  readonly line: Line;
  readonly kind: `s5bInstrument`;
  readonly name: string;
};
