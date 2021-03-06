import { ArpeggioEnvelopeCommand } from "./arpeggio-envelope-command";
import { DutyCycleEnvelopeCommand } from "./duty-cycle-envelope-command";
import { FamicomDiskSystemModulationEnvelopeCommand } from "./famicom-disk-system-modulation-envelope-command";
import { FamicomDiskSystemWaveEnvelopeCommand } from "./famicom-disk-system-wave-envelope-command";
import { N163WaveEnvelopeCommand } from "./n163-wave-envelope-command";
import { PitchEnvelopeCommand } from "./pitch-envelope-command";
import { VolumeEnvelopeCommand } from "./volume-envelope-command";

export { ArpeggioEnvelopeCommand } from "./arpeggio-envelope-command";
export { DutyCycleEnvelopeCommand } from "./duty-cycle-envelope-command";
export { FamicomDiskSystemModulationEnvelopeCommand } from "./famicom-disk-system-modulation-envelope-command";
export { FamicomDiskSystemWaveEnvelopeCommand } from "./famicom-disk-system-wave-envelope-command";
export { N163WaveEnvelopeCommand } from "./n163-wave-envelope-command";
export { PitchEnvelopeCommand } from "./pitch-envelope-command";
export { VolumeEnvelopeCommand } from "./volume-envelope-command";

export type EnvelopeCommand =
  | ArpeggioEnvelopeCommand
  | DutyCycleEnvelopeCommand
  | FamicomDiskSystemModulationEnvelopeCommand
  | FamicomDiskSystemWaveEnvelopeCommand
  | N163WaveEnvelopeCommand
  | PitchEnvelopeCommand
  | VolumeEnvelopeCommand;
