import { Line } from "../../../line";
import { NoteValue } from "../../../note-value";
import { S8 } from "../../../s8";
import { U12 } from "../../../u12";
import { U2 } from "../../../u2";
import { U4 } from "../../../u4";
import { U5 } from "../../../u5";
import { U6 } from "../../../u6";
import { VibratoSpeed } from "../../../vibrato-speed";

export type FamicomDiskSystemNoteCommand = {
  readonly line: Line;
  readonly kind: `famicomDiskSystemNote`;
  readonly time: unknown;
  readonly value: null | NoteValue;
  readonly instrument: null | string;
  readonly arpeggio: null | string;
  readonly attack: null | boolean;
  readonly volume: null | U4;
  readonly vibrato: null | {
    readonly speed: VibratoSpeed;
    readonly depth: U4;
  };
  readonly finePitch: null | S8;
  readonly slideTarget: null | NoteValue;
  readonly famicomDiskSystem: null | {
    readonly modulation: {
      readonly speed: U12;
      readonly depth: U6;
    };
  };
  readonly dutyCycle: U2;
  readonly noteDelay: U5;
  readonly cutDelay: U5;
};
