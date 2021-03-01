import { FamicomDiskSystemInstrumentCommand } from "./famicom-disk-system-instrument-command";
import { Mmc5InstrumentCommand } from "./mmc5-instrument-command";
import { N163InstrumentCommand } from "./n163-instrument-command";
import { RP2A03InstrumentCommand } from "./rp2a03-instrument-command";
import { S5bInstrumentCommand } from "./s5b-instrument-command";
import { Vrc6InstrumentCommand } from "./vrc6-instrument-command";
import { Vrc7InstrumentCommand } from "./vrc7-instrument-command";

export { FamicomDiskSystemInstrumentCommand } from "./famicom-disk-system-instrument-command";
export { Mmc5InstrumentCommand } from "./mmc5-instrument-command";
export {
  CustomN163InstrumentCommand,
  PresetN163InstrumentCommand,
  N163InstrumentCommand,
} from "./n163-instrument-command";
export { RP2A03InstrumentCommand } from "./rp2a03-instrument-command";
export { S5bInstrumentCommand } from "./s5b-instrument-command";
export { Vrc6InstrumentCommand } from "./vrc6-instrument-command";
export {
  CustomVrc7InstrumentCommand,
  PatchVrc7InstrumentCommand,
  Vrc7InstrumentCommand,
} from "./vrc7-instrument-command";

export type InstrumentCommand =
  | FamicomDiskSystemInstrumentCommand
  | Mmc5InstrumentCommand
  | N163InstrumentCommand
  | RP2A03InstrumentCommand
  | S5bInstrumentCommand
  | Vrc6InstrumentCommand
  | Vrc7InstrumentCommand;
