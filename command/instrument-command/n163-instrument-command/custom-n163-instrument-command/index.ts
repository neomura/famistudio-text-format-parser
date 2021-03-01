import { Line } from "../../../../line";
import { N163WavePosition } from "../../../../n163-wave-position";

export type CustomN163InstrumentCommand = {
  readonly line: Line;
  readonly kind: `customN163Instrument`;
  readonly name: string;
  readonly position: N163WavePosition;
};
