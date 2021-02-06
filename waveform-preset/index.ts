export type WaveformPreset =
  | `sine`
  | `triangle`
  | `sawtooth`
  | `square50`
  | `square25`
  | `flat`
  | `custom`;

export const waveformPresets: ReadonlyArray<WaveformPreset> = [
  `sine`,
  `triangle`,
  `sawtooth`,
  `square50`,
  `square25`,
  `flat`,
  `custom`,
];
