import { CustomN163InstrumentCommand } from "./custom-n163-instrument-command";
import { PresetN163InstrumentCommand } from "./preset-n163-instrument-command";

export { CustomN163InstrumentCommand } from "./custom-n163-instrument-command";
export { PresetN163InstrumentCommand } from "./preset-n163-instrument-command";

export type N163InstrumentCommand =
  | CustomN163InstrumentCommand
  | PresetN163InstrumentCommand;
