import { Line } from "../../line";
import { U4 } from "../../u4";

export type DpcmSampleCommand = {
  readonly line: Line;
  readonly kind: `dpcmSample`;
  readonly name: string;
  readonly data: ReadonlyArray<U4>;
};
