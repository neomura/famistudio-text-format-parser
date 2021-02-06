import { BasicNoteCommand } from "./basic-note-command";
import { FamicomDiskSystemNoteCommand } from "./famicom-disk-system-note-command";
import { ReleaseNoteCommand } from "./release-note-command";
import { StopNoteCommand } from "./stop-note-command";

export { BasicNoteCommand } from "./basic-note-command";
export { FamicomDiskSystemNoteCommand } from "./famicom-disk-system-note-command";
export { ReleaseNoteCommand } from "./release-note-command";
export { StopNoteCommand } from "./stop-note-command";

export type NoteCommand =
  | BasicNoteCommand
  | FamicomDiskSystemNoteCommand
  | ReleaseNoteCommand
  | StopNoteCommand;
