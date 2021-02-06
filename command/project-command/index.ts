import { Expansion } from "../../expansion";
import { Line } from "../../line";
import { TempoMode } from "../../tempo-mode";

export type ProjectCommand = {
  readonly line: Line;
  readonly kind: `project`;
  readonly version: string;
  readonly expansion: null | Expansion;
  readonly tempoMode: null | TempoMode;
  readonly name: null | string;
  readonly author: null | string;
  readonly copyright: null | string;
};
