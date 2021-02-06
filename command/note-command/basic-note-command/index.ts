import { Line } from "../../../line";
import { NoteValue } from "../../../note-value";
import { S8 } from "../../../s8";
import { U3 } from "../../../u3";
import { U4 } from "../../../u4";
import { U5 } from "../../../u5";
import { VibratoSpeed } from "../../../vibrato-speed";

export type BasicNoteCommand = {
  readonly line: Line;
  readonly kind: `basicNote`;
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
  /** NOTE: This is U2 for all except VR6 squares. */
  readonly dutyCycle: U3;
  readonly noteDelay: U5;
  readonly cutDelay: U5;
};
