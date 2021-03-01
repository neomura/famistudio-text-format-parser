export type WaveformPreset =
  | `sine`
  | `triangle`
  | `sawtooth`
  | `square50`
  | `square25`
  | `flat`;

export const waveformPresets: ReadonlyArray<WaveformPreset> = [
  `sine`,
  `triangle`,
  `sawtooth`,
  `square50`,
  `square25`,
  `flat`,
];
