# neomura/famistudio-text-format-parser

Helpers for parsing the FamiStudio text format using NodeJS.

[MIT licensed](./license.md).  Some sections taken from the [FamiStudio repository](https://github.com/BleuBleu/FamiStudio), which is also MIT licensed.

## Usage

### Transforming text to line objects

Given the following javascript file and example from the FamiStudio documentation:

```ts
import { createReadStream } from "fs"
import { Line, TextToLineTransform } from "@neomura/famistudio-text-format-parser";

const lines: Line[] = [];

createReadStream(`example.txt`)
  .pipe(new TextToLineTransform())
  .on(`data`, (chunk) => {
    lines.push(...chunk);
  })
  .on(`error`, (err) => {
    console.error(err);
    process.exit(1);
  })
  .on(`end`, () => {
    console.log(JSON.stringify(lines, null, 2));
  });
```

```
MIT License

Copyright (c) 2019 BleuBleu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

```
Project Version="2.0.0" TempoMode="FamiStudio" Name="FamiStudio Tutorial" Author="NesBleuBleu"
    DPCMSample Name="BassDrum" Data="aaaaaaaaaaaff09e9ff006ae7c1b98f0000300"
    DPCMMapping Note="C3" Sample="BassDrum" Pitch="15" Loop="False"
    Instrument Name="Lead"
        Envelope Type="Volume" Length="1" Values="12"
        Envelope Type="DutyCycle" Length="1" Values="2"
    Instrument Name="Lead2"
        Envelope Type="Volume" Length="12" Values="15,12,11,9,7,6,5,4,3,2,1,1"
    Song Name="Tutorial Song" Length="5" LoopPoint="1" PatternLength="16" BeatLength="4" NoteLength="7"
        PatternCustomSettings Time="0" Length="10" NoteLength="7" BeatLength="4"
        Channel Type="Square1"
            Pattern Name="Intro1"
                Note Time="0" Value="G3" Instrument="Lead"
                Note Time="14" Value="A#3" Instrument="Lead"
                Note Time="28" Value="G3" Instrument="Lead"
                Note Time="42" Value="A#3" Instrument="Lead"
                Note Time="63" Value="A#3" Instrument="Lead" SlideTarget="C4"
            Pattern Name="Melody1"
                Note Time="0" Value="C4" Instrument="Lead2" Volume="15"
                Note Time="70" Value="D#4" Instrument="Lead2"
                Note Time="98" Value="D4" Instrument="Lead2"
        PatternInstance Time="0" Pattern="Intro1"
        PatternInstance Time="1" Pattern="Melody1"
```

This will produce the following output; one object is emitted per (populated) line:

```json
[
  {
    "row": 1,
    "type": "Project",
    "typeColumn": 1,
    "attributes": {
      "Version": {
        "keyColumn": 9,
        "valueColumn": 18,
        "value": "2.0.0"
      },
      "TempoMode": {
        "keyColumn": 25,
        "valueColumn": 36,
        "value": "FamiStudio"
      },
      "Name": {
        "keyColumn": 48,
        "valueColumn": 54,
        "value": "FamiStudio Tutorial"
      },
      "Author": {
        "keyColumn": 75,
        "valueColumn": 83,
        "value": "NesBleuBleu"
      }
    }
  },
  {
    "row": 2,
    "type": "DPCMSample",
    "typeColumn": 5,
    "attributes": {
      "Name": {
        "keyColumn": 16,
        "valueColumn": 22,
        "value": "BassDrum"
      },
      "Data": {
        "keyColumn": 32,
        "valueColumn": 38,
        "value": "aaaaaaaaaaaff09e9ff006ae7c1b98f0000300"
      }
    }
  },
  {
    "row": 3,
    "type": "DPCMMapping",
    "typeColumn": 5,
    "attributes": {
      "Note": {
        "keyColumn": 17,
        "valueColumn": 23,
        "value": "C3"
      },
      "Sample": {
        "keyColumn": 27,
        "valueColumn": 35,
        "value": "BassDrum"
      },
      "Pitch": {
        "keyColumn": 45,
        "valueColumn": 52,
        "value": "15"
      },
      "Loop": {
        "keyColumn": 56,
        "valueColumn": 62,
        "value": "False"
      }
    }
  },
  {
    "row": 4,
    "type": "Instrument",
    "typeColumn": 5,
    "attributes": {
      "Name": {
        "keyColumn": 16,
        "valueColumn": 22,
        "value": "Lead"
      }
    }
  },
  {
    "row": 5,
    "type": "Envelope",
    "typeColumn": 9,
    "attributes": {
      "Type": {
        "keyColumn": 18,
        "valueColumn": 24,
        "value": "Volume"
      },
      "Length": {
        "keyColumn": 32,
        "valueColumn": 40,
        "value": "1"
      },
      "Values": {
        "keyColumn": 43,
        "valueColumn": 51,
        "value": "12"
      }
    }
  },
  {
    "row": 6,
    "type": "Envelope",
    "typeColumn": 9,
    "attributes": {
      "Type": {
        "keyColumn": 18,
        "valueColumn": 24,
        "value": "DutyCycle"
      },
      "Length": {
        "keyColumn": 35,
        "valueColumn": 43,
        "value": "1"
      },
      "Values": {
        "keyColumn": 46,
        "valueColumn": 54,
        "value": "2"
      }
    }
  },
  {
    "row": 7,
    "type": "Instrument",
    "typeColumn": 5,
    "attributes": {
      "Name": {
        "keyColumn": 16,
        "valueColumn": 22,
        "value": "Lead2"
      }
    }
  },
  {
    "row": 8,
    "type": "Envelope",
    "typeColumn": 9,
    "attributes": {
      "Type": {
        "keyColumn": 18,
        "valueColumn": 24,
        "value": "Volume"
      },
      "Length": {
        "keyColumn": 32,
        "valueColumn": 40,
        "value": "12"
      },
      "Values": {
        "keyColumn": 44,
        "valueColumn": 52,
        "value": "15,12,11,9,7,6,5,4,3,2,1,1"
      }
    }
  },
  {
    "row": 9,
    "type": "Song",
    "typeColumn": 5,
    "attributes": {
      "Name": {
        "keyColumn": 10,
        "valueColumn": 16,
        "value": "Tutorial Song"
      },
      "Length": {
        "keyColumn": 31,
        "valueColumn": 39,
        "value": "5"
      },
      "LoopPoint": {
        "keyColumn": 42,
        "valueColumn": 53,
        "value": "1"
      },
      "PatternLength": {
        "keyColumn": 56,
        "valueColumn": 71,
        "value": "16"
      },
      "BeatLength": {
        "keyColumn": 75,
        "valueColumn": 87,
        "value": "4"
      },
      "NoteLength": {
        "keyColumn": 90,
        "valueColumn": 102,
        "value": "7"
      }
    }
  },
  {
    "row": 10,
    "type": "PatternCustomSettings",
    "typeColumn": 9,
    "attributes": {
      "Time": {
        "keyColumn": 31,
        "valueColumn": 37,
        "value": "0"
      },
      "Length": {
        "keyColumn": 40,
        "valueColumn": 48,
        "value": "10"
      },
      "NoteLength": {
        "keyColumn": 52,
        "valueColumn": 64,
        "value": "7"
      },
      "BeatLength": {
        "keyColumn": 67,
        "valueColumn": 79,
        "value": "4"
      }
    }
  },
  {
    "row": 11,
    "type": "Channel",
    "typeColumn": 9,
    "attributes": {
      "Type": {
        "keyColumn": 17,
        "valueColumn": 23,
        "value": "Square1"
      }
    }
  },
  {
    "row": 12,
    "type": "Pattern",
    "typeColumn": 13,
    "attributes": {
      "Name": {
        "keyColumn": 21,
        "valueColumn": 27,
        "value": "Intro1"
      }
    }
  },
  {
    "row": 13,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "0"
      },
      "Value": {
        "keyColumn": 31,
        "valueColumn": 38,
        "value": "G3"
      },
      "Instrument": {
        "keyColumn": 42,
        "valueColumn": 54,
        "value": "Lead"
      }
    }
  },
  {
    "row": 14,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "14"
      },
      "Value": {
        "keyColumn": 32,
        "valueColumn": 39,
        "value": "A#3"
      },
      "Instrument": {
        "keyColumn": 44,
        "valueColumn": 56,
        "value": "Lead"
      }
    }
  },
  {
    "row": 15,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "28"
      },
      "Value": {
        "keyColumn": 32,
        "valueColumn": 39,
        "value": "G3"
      },
      "Instrument": {
        "keyColumn": 43,
        "valueColumn": 55,
        "value": "Lead"
      }
    }
  },
  {
    "row": 16,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "42"
      },
      "Value": {
        "keyColumn": 32,
        "valueColumn": 39,
        "value": "A#3"
      },
      "Instrument": {
        "keyColumn": 44,
        "valueColumn": 56,
        "value": "Lead"
      }
    }
  },
  {
    "row": 17,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "63"
      },
      "Value": {
        "keyColumn": 32,
        "valueColumn": 39,
        "value": "A#3"
      },
      "Instrument": {
        "keyColumn": 44,
        "valueColumn": 56,
        "value": "Lead"
      },
      "SlideTarget": {
        "keyColumn": 62,
        "valueColumn": 75,
        "value": "C4"
      }
    }
  },
  {
    "row": 18,
    "type": "Pattern",
    "typeColumn": 13,
    "attributes": {
      "Name": {
        "keyColumn": 21,
        "valueColumn": 27,
        "value": "Melody1"
      }
    }
  },
  {
    "row": 19,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "0"
      },
      "Value": {
        "keyColumn": 31,
        "valueColumn": 38,
        "value": "C4"
      },
      "Instrument": {
        "keyColumn": 42,
        "valueColumn": 54,
        "value": "Lead2"
      },
      "Volume": {
        "keyColumn": 61,
        "valueColumn": 69,
        "value": "15"
      }
    }
  },
  {
    "row": 20,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "70"
      },
      "Value": {
        "keyColumn": 32,
        "valueColumn": 39,
        "value": "D#4"
      },
      "Instrument": {
        "keyColumn": 44,
        "valueColumn": 56,
        "value": "Lead2"
      }
    }
  },
  {
    "row": 21,
    "type": "Note",
    "typeColumn": 17,
    "attributes": {
      "Time": {
        "keyColumn": 22,
        "valueColumn": 28,
        "value": "98"
      },
      "Value": {
        "keyColumn": 32,
        "valueColumn": 39,
        "value": "D4"
      },
      "Instrument": {
        "keyColumn": 43,
        "valueColumn": 55,
        "value": "Lead2"
      }
    }
  },
  {
    "row": 22,
    "type": "PatternInstance",
    "typeColumn": 9,
    "attributes": {
      "Time": {
        "keyColumn": 25,
        "valueColumn": 31,
        "value": "0"
      },
      "Pattern": {
        "keyColumn": 34,
        "valueColumn": 43,
        "value": "Intro1"
      }
    }
  },
  {
    "row": 23,
    "type": "PatternInstance",
    "typeColumn": 9,
    "attributes": {
      "Time": {
        "keyColumn": 25,
        "valueColumn": 31,
        "value": "1"
      },
      "Pattern": {
        "keyColumn": 34,
        "valueColumn": 43,
        "value": "Melody1"
      }
    }
  }
]
```

### Miscellaneous exports

#### Expansions

```ts
import { expansions } from "@neomura/famistudio-text-format-parser";

console.log(JSON.stringify(expansions, null, 2));
```

This will produce the following output:

```json
[
  "VRC6",
  "VRC7",
  "FDS",
  "MMC5",
  "N163",
  "S5B"
]
```

#### Tempo Modes

```ts
import { tempoModes } from "@neomura/famistudio-text-format-parser";

console.log(JSON.stringify(tempoModes, null, 2));
```

This will produce the following output:

```json
[
  "FamiTracker",
  "FamiStudio"
]
```

#### Note values

```ts
import { noteValues } from "@neomura/famistudio-text-format-parser";

console.log(JSON.stringify(noteValues, null, 2));
```

This will produce the following output:

```json
[
  "C0",
  "C#0",
  "D0",
  "D#0",
  "E0",
  "F0",
  "F#0",
  "G0",
  "G#0",
  "A0",
  "A#0",
  "B0",
  "C1",
  "C#1",
  "D1",
  "D#1",
  "E1",
  "F1",
  "F#1",
  "G1",
  "G#1",
  "A1",
  "A#1",
  "B1",
  "C2",
  "C#2",
  "D2",
  "D#2",
  "E2",
  "F2",
  "F#2",
  "G2",
  "G#2",
  "A2",
  "A#2",
  "B2",
  "C3",
  "C#3",
  "D3",
  "D#3",
  "E3",
  "F3",
  "F#3",
  "G3",
  "G#3",
  "A3",
  "A#3",
  "B3",
  "C4",
  "C#4",
  "D4",
  "D#4",
  "E4",
  "F4",
  "F#4",
  "G4",
  "G#4",
  "A4",
  "A#4",
  "B4",
  "C5",
  "C#5",
  "D5",
  "D#5",
  "E5",
  "F5",
  "F#5",
  "G5",
  "G#5",
  "A5",
  "A#5",
  "B5",
  "C6",
  "C#6",
  "D6",
  "D#6",
  "E6",
  "F6",
  "F#6",
  "G6",
  "G#6",
  "A6",
  "A#6",
  "B6",
  "C7",
  "C#7",
  "D7",
  "D#7",
  "E7",
  "F7",
  "F#7",
  "G7",
  "G#7",
  "A7",
  "A#7",
  "B7"
]
```
