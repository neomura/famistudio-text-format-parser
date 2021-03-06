export type Expansion =
  | `vrc6`
  | `vrc7`
  | `famicomDiskSystem`
  | `mmc5`
  | `n163`
  | `s5B`;

export const expansions: ReadonlyArray<readonly [string, Expansion]> = [
  [`VRC6`, `vrc6`],
  [`VRC7`, `vrc7`],
  [`FDS`, `famicomDiskSystem`],
  [`MMC5`, `mmc5`],
  [`N163`, `n163`],
  [`S5B`, `s5B`],
];
