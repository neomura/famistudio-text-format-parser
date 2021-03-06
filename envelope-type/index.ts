export type EnvelopeType =
  | `volume`
  | `arpeggio`
  | `pitch`
  | `dutyCycle`
  | `famicomDiskSystemWave`
  | `famicomDiskSystemModulation`
  | `n163Wave`;

export const envelopeTypes: ReadonlyArray<readonly [string, EnvelopeType]> = [
  [`Volume`, `volume`],
  [`Arpeggio`, `arpeggio`],
  [`Pitch`, `pitch`],
  [`DutyCycle`, `dutyCycle`],
  [`FDSWave`, `famicomDiskSystemWave`],
  [`FDSMod`, `famicomDiskSystemModulation`],
  [`N163Wave`, `n163Wave`],
];
