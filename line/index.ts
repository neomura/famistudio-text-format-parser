import { AttributeValue } from "./attribute-value";

export { AttributeValue } from "./attribute-value";

export type Line = {
  readonly row: number;
  readonly type: string;
  readonly typeColumn: number;
  readonly attributes: {
    readonly [key: string]: AttributeValue;
  };
};
