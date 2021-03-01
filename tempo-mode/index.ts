export type TempoMode = `famiTracker` | `famiStudio`;

export const tempoModes: ReadonlyArray<readonly [string, TempoMode]> = [
  [`FamiTracker`, `famiTracker`],
  [`FamiStudio`, `famiStudio`],
];
