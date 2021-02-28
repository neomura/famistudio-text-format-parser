import { Line } from "../../../../line";
import { U2 } from "../../../../u2";
import { U3 } from "../../../../u3";
import { U4 } from "../../../../u4";
import { U6 } from "../../../../u6";

export type CustomVrc7InstrumentCommand = {
  readonly line: Line;
  readonly kind: `customVrc7InstrumentCommand`;
  readonly name: string;
  readonly carrier: {
    readonly tremolo: boolean;
    readonly vibrato: boolean;
    readonly sustained: boolean;
    readonly waveRecified: boolean;
    readonly keyScaling: null | U2;
    readonly frequencyMultiplier: U4;
    readonly attack: U4;
    readonly decay: U4;
    readonly sustain: U4;
    readonly release: U4;
  };
  readonly modulator: {
    readonly tremolo: boolean;
    readonly vibrato: boolean;
    readonly sustained: boolean;
    readonly waveRectified: boolean;
    readonly keyScaling: null | U2;
    readonly frequencyMultiplier: U4;
    readonly attack: U4;
    readonly decay: U4;
    readonly sustain: U4;
    readonly release: U4;
    readonly level: U6;
    readonly feedback: U3;
  };
};
