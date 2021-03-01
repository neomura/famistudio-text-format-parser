import { Line } from "../../../line";
import { U12 } from "../../../u12";
import { U2 } from "../../../u2";
import { U6 } from "../../../u6";
import { U8 } from "../../../u8";
import { WaveformPreset } from "../../../waveform-preset";

export type FamicomDiskSystemInstrumentCommand = {
  readonly line: Line;
  readonly kind: `famicomDiskSystemInstrument`;
  readonly name: string;
  readonly wavePreset: WaveformPreset;
  readonly masterVolume: U2;
  readonly modulation: {
    readonly preset: `custom` | WaveformPreset;
    readonly speed: U12;
    readonly depth: U6;
    readonly delay: U8;
  };
};
