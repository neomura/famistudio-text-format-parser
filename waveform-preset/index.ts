export type WaveformPreset =
  | `sine`
  | `triangle`
  | `sawtooth`
  | `square50`
  | `square25`
  | `flat`;

export const waveformPresets: ReadonlyArray<
  readonly [string, WaveformPreset]
> = [
  [`Sine`, `sine`],
  [`Triangle`, `triangle`],
  [`Sawtooth`, `sawtooth`],
  [`Square 50%`, `square50`],
  [`Square 25%`, `square25`],
  [`Flat`, `flat`],
];
