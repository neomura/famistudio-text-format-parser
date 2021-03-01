import { CustomVrc7InstrumentCommand } from "./custom-vrc7-instrument-command";
import { PatchVrc7InstrumentCommand } from "./patch-vrc7-instrument-command";

export { CustomVrc7InstrumentCommand } from "./custom-vrc7-instrument-command";
export { PatchVrc7InstrumentCommand } from "./patch-vrc7-instrument-command";

export type Vrc7InstrumentCommand =
  | CustomVrc7InstrumentCommand
  | PatchVrc7InstrumentCommand;
