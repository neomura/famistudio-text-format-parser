import { FamicomDiskSystemModulation } from "../../../famicom-disk-system-modulation";
import { Line } from "../../../line";

export type FamicomDiskSystemModulationEnvelopeCommand = {
  readonly line: Line;
  readonly kind: `famicomDiskSystemModulationEnvelope`;
  readonly values: FamicomDiskSystemModulation;
};
