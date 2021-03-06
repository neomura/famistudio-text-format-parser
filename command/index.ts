import { ArpeggioCommand } from "./arpeggio-command";
import { ChannelCommand } from "./channel-command";
import { DpcmMappingCommand } from "./dpcm-mapping-command";
import { DpcmSampleCommand } from "./dpcm-sample-command";
import { EnvelopeCommand } from "./envelope-command";
import { InstrumentCommand } from "./instrument-command";
import {
  BasicNoteCommand,
  FamicomDiskSystemNoteCommand,
  NoteCommand,
  ReleaseNoteCommand,
  StopNoteCommand,
} from "./note-command";
import { PatternCommand } from "./pattern-command";
import { PatternCustomSettingsCommand } from "./pattern-custom-settings-command";
import { PatternInstanceCommand } from "./pattern-instance-command";
import { ProjectCommand } from "./project-command";
import { SongCommand } from "./song-command";

export { ArpeggioCommand } from "./arpeggio-command";
export { ChannelCommand } from "./channel-command";
export { DpcmMappingCommand } from "./dpcm-mapping-command";
export { DpcmSampleCommand } from "./dpcm-sample-command";
export {
  EnvelopeCommand,
  ArpeggioEnvelopeCommand,
  DutyCycleEnvelopeCommand,
  FamicomDiskSystemModulationEnvelopeCommand,
  FamicomDiskSystemWaveEnvelopeCommand,
  N163WaveEnvelopeCommand,
  PitchEnvelopeCommand,
  VolumeEnvelopeCommand,
} from "./envelope-command";
export {
  InstrumentCommand,
  FamicomDiskSystemInstrumentCommand,
  Mmc5InstrumentCommand,
  CustomN163InstrumentCommand,
  PresetN163InstrumentCommand,
  N163InstrumentCommand,
  RP2A03InstrumentCommand,
  S5bInstrumentCommand,
  Vrc6InstrumentCommand,
  Vrc7InstrumentCommand,
} from "./instrument-command";
export {
  NoteCommand,
  BasicNoteCommand,
  FamicomDiskSystemNoteCommand,
  ReleaseNoteCommand,
  StopNoteCommand,
} from "./note-command";
export { PatternCommand } from "./pattern-command";
export { PatternCustomSettingsCommand } from "./pattern-custom-settings-command";
export { PatternInstanceCommand } from "./pattern-instance-command";
export { ProjectCommand } from "./project-command";
export { SongCommand } from "./song-command";

export type Command =
  | ArpeggioCommand
  | ChannelCommand
  | DpcmMappingCommand
  | DpcmSampleCommand
  | EnvelopeCommand
  | InstrumentCommand
  | NoteCommand
  | BasicNoteCommand
  | FamicomDiskSystemNoteCommand
  | ReleaseNoteCommand
  | StopNoteCommand
  | PatternCommand
  | PatternCustomSettingsCommand
  | PatternInstanceCommand
  | ProjectCommand
  | SongCommand;
