import { FamicomDiskSystemWave } from "../../../famicom-disk-system-wave";
import { Line } from "../../../line";

export type FamicomDiskSystemWaveEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `famicomDiskSystemWaveEnvelope`;
  readonly values: FamicomDiskSystemWave;
};
