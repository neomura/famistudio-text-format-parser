import { Line } from "../../../line";
import { N163WavePosition } from "../../../n163-wave-position";
import { N163WaveSize } from "../../../n163-wave-size";
import { WaveformPreset } from "../../../waveform-preset";

export type N163InstrumentCommand = {
  readonly line: Line;
  readonly kind: `n163Instrument`;
  readonly name: string;
  readonly preset: WaveformPreset;
  readonly size: N163WaveSize;
  readonly position: N163WavePosition;
};
