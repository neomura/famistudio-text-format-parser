import { FamicomDiskSystemInstrumentCommand } from "./famicom-disk-system-instrument-command";
import { N163InstrumentCommand } from "./n163-instrument-command";
import { RP2A03InstrumentCommand } from "./rp2a03-instrument-command";
import { VRC7InstrumentCommand } from "./vrc7-instrument-command";

export { FamicomDiskSystemInstrumentCommand } from "./famicom-disk-system-instrument-command";
export { N163InstrumentCommand } from "./n163-instrument-command";
export { RP2A03InstrumentCommand } from "./rp2a03-instrument-command";
export {
  CustomVrc7InstrumentCommand,
  PatchVrc7InstrumentCommand,
  VRC7InstrumentCommand,
} from "./vrc7-instrument-command";

export type InstrumentCommand =
  | FamicomDiskSystemInstrumentCommand
  | N163InstrumentCommand
  | RP2A03InstrumentCommand
  | VRC7InstrumentCommand;
