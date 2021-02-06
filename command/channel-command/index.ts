import { ChannelType } from "../../channel-type";
import { Line } from "../../line";

export type ChannelCommand = {
  readonly line: Line;
  readonly kind: `channel`;
  readonly type: ChannelType;
};
