import { Readable } from "stream";
import { Line, TextToLineTransform, FormatError } from "..";

describe(`TextToLineTransform`, () => {
  function withBothLineBreakTypes(
    input: string,
    callback: (input: string) => void
  ) {
    describe(`with carriage return line feed pairs`, () => {
      callback(input.replace(/\n/g, `\r\n`));
    });

    describe(`with line feeds`, () => {
      callback(input.replace(/\r\n/g, `\n`));
    });
  }

  for (const successfulScenario of [
    {
      description: `with a line with only a type`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      output: [
        {
          row: 1,
          typeColumn: 1,
          type: `TypeA`,
          attributes: {
            AttributeAA: {
              keyColumn: 7,
              valueColumn: 20,
              value: `Value A A`,
            },
            AttributeAB: {
              keyColumn: 31,
              valueColumn: 44,
              value: `Value A B`,
            },
            AttributeAC: {
              keyColumn: 55,
              valueColumn: 68,
              value: `Value A C`,
            },
          },
        },
        {
          row: 2,
          typeColumn: 1,
          type: `TypeB`,
          attributes: {},
        },
        {
          row: 3,
          typeColumn: 1,
          type: `TypeC`,
          attributes: {
            AttributeCA: {
              keyColumn: 7,
              valueColumn: 20,
              value: `Value C A`,
            },
            AttributeCB: {
              keyColumn: 31,
              valueColumn: 44,
              value: `Value C B`,
            },
            AttributeCC: {
              keyColumn: 55,
              valueColumn: 68,
              value: `Value C C`,
            },
          },
        },
      ],
    },
    {
      description: `white space, compact lines and escaped quotes`,
      input: `

   \t   TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"


TypeB AttributeBA="Value B A" AttributeBB    \t = \t \t    "Value B B"   \t  AttributeBC="Value B C"\t

    TypeC AttributeCA="Value C A""" AttributeCB="Value ""C"" B" AttributeCC="""Value C C"


TypeD AttributeDA="Value D A"AttributeDB="Value D B"AttributeDC="Value D C"


    `,
      output: [
        {
          row: 3,
          typeColumn: 8,
          type: `TypeA`,
          attributes: {
            AttributeAA: {
              keyColumn: 14,
              valueColumn: 27,
              value: `Value A A`,
            },
            AttributeAB: {
              keyColumn: 38,
              valueColumn: 51,
              value: `Value A B`,
            },
            AttributeAC: {
              keyColumn: 62,
              valueColumn: 75,
              value: `Value A C`,
            },
          },
        },
        {
          row: 6,
          typeColumn: 1,
          type: `TypeB`,
          attributes: {
            AttributeBA: {
              keyColumn: 7,
              valueColumn: 20,
              value: `Value B A`,
            },
            AttributeBB: {
              keyColumn: 31,
              valueColumn: 58,
              value: `Value B B`,
            },
            AttributeBC: {
              keyColumn: 74,
              valueColumn: 87,
              value: `Value B C`,
            },
          },
        },
        {
          row: 8,
          typeColumn: 5,
          type: `TypeC`,
          attributes: {
            AttributeCA: {
              keyColumn: 11,
              valueColumn: 24,
              value: `Value C A"`,
            },
            AttributeCB: {
              keyColumn: 37,
              valueColumn: 50,
              value: `Value "C" B`,
            },
            AttributeCC: {
              keyColumn: 65,
              valueColumn: 78,
              value: `"Value C C`,
            },
          },
        },
        {
          row: 11,
          typeColumn: 1,
          type: `TypeD`,
          attributes: {
            AttributeDA: {
              keyColumn: 7,
              valueColumn: 20,
              value: `Value D A`,
            },
            AttributeDB: {
              keyColumn: 30,
              valueColumn: 43,
              value: `Value D B`,
            },
            AttributeDC: {
              keyColumn: 53,
              valueColumn: 66,
              value: `Value D C`,
            },
          },
        },
      ],
    },
    {
      description: `the example from the documentation`,

      /**
       * MIT License
       *
       * Copyright (c) 2019 BleuBleu
       *
       * Permission is hereby granted, free of charge, to any person obtaining a copy
       * of this software and associated documentation files (the "Software"), to deal
       * in the Software without restriction, including without limitation the rights
       * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
       * copies of the Software, and to permit persons to whom the Software is
       * furnished to do so, subject to the following conditions:
       *
       * The above copyright notice and this permission notice shall be included in all
       * copies or substantial portions of the Software.
       *
       * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
       * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
       * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
       * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
       * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
       * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
       * SOFTWARE.
       */
      input: `Project Version="2.0.0" TempoMode="FamiStudio" Name="FamiStudio Tutorial" Author="NesBleuBleu"
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
        PatternInstance Time="1" Pattern="Melody1"`,
      output: [
        {
          row: 1,
          type: `Project`,
          typeColumn: 1,
          attributes: {
            Version: {
              keyColumn: 9,
              valueColumn: 18,
              value: `2.0.0`,
            },
            TempoMode: {
              keyColumn: 25,
              valueColumn: 36,
              value: `FamiStudio`,
            },
            Name: {
              keyColumn: 48,
              valueColumn: 54,
              value: `FamiStudio Tutorial`,
            },
            Author: {
              keyColumn: 75,
              valueColumn: 83,
              value: `NesBleuBleu`,
            },
          },
        },
        {
          row: 2,
          type: `DPCMSample`,
          typeColumn: 5,
          attributes: {
            Name: {
              keyColumn: 16,
              valueColumn: 22,
              value: `BassDrum`,
            },
            Data: {
              keyColumn: 32,
              valueColumn: 38,
              value: `aaaaaaaaaaaff09e9ff006ae7c1b98f0000300`,
            },
          },
        },
        {
          row: 3,
          type: `DPCMMapping`,
          typeColumn: 5,
          attributes: {
            Note: {
              keyColumn: 17,
              valueColumn: 23,
              value: `C3`,
            },
            Sample: {
              keyColumn: 27,
              valueColumn: 35,
              value: `BassDrum`,
            },
            Pitch: {
              keyColumn: 45,
              valueColumn: 52,
              value: `15`,
            },
            Loop: {
              keyColumn: 56,
              valueColumn: 62,
              value: `False`,
            },
          },
        },
        {
          row: 4,
          type: `Instrument`,
          typeColumn: 5,
          attributes: {
            Name: {
              keyColumn: 16,
              valueColumn: 22,
              value: `Lead`,
            },
          },
        },
        {
          row: 5,
          type: `Envelope`,
          typeColumn: 9,
          attributes: {
            Type: {
              keyColumn: 18,
              valueColumn: 24,
              value: `Volume`,
            },
            Length: {
              keyColumn: 32,
              valueColumn: 40,
              value: `1`,
            },
            Values: {
              keyColumn: 43,
              valueColumn: 51,
              value: `12`,
            },
          },
        },
        {
          row: 6,
          type: `Envelope`,
          typeColumn: 9,
          attributes: {
            Type: {
              keyColumn: 18,
              valueColumn: 24,
              value: `DutyCycle`,
            },
            Length: {
              keyColumn: 35,
              valueColumn: 43,
              value: `1`,
            },
            Values: {
              keyColumn: 46,
              valueColumn: 54,
              value: `2`,
            },
          },
        },
        {
          row: 7,
          type: `Instrument`,
          typeColumn: 5,
          attributes: {
            Name: {
              keyColumn: 16,
              valueColumn: 22,
              value: `Lead2`,
            },
          },
        },
        {
          row: 8,
          type: `Envelope`,
          typeColumn: 9,
          attributes: {
            Type: {
              keyColumn: 18,
              valueColumn: 24,
              value: `Volume`,
            },
            Length: {
              keyColumn: 32,
              valueColumn: 40,
              value: `12`,
            },
            Values: {
              keyColumn: 44,
              valueColumn: 52,
              value: `15,12,11,9,7,6,5,4,3,2,1,1`,
            },
          },
        },
        {
          row: 9,
          type: `Song`,
          typeColumn: 5,
          attributes: {
            Name: {
              keyColumn: 10,
              valueColumn: 16,
              value: `Tutorial Song`,
            },
            Length: {
              keyColumn: 31,
              valueColumn: 39,
              value: `5`,
            },
            LoopPoint: {
              keyColumn: 42,
              valueColumn: 53,
              value: `1`,
            },
            PatternLength: {
              keyColumn: 56,
              valueColumn: 71,
              value: `16`,
            },
            BeatLength: {
              keyColumn: 75,
              valueColumn: 87,
              value: `4`,
            },
            NoteLength: {
              keyColumn: 90,
              valueColumn: 102,
              value: `7`,
            },
          },
        },
        {
          row: 10,
          type: `PatternCustomSettings`,
          typeColumn: 9,
          attributes: {
            Time: {
              keyColumn: 31,
              valueColumn: 37,
              value: `0`,
            },
            Length: {
              keyColumn: 40,
              valueColumn: 48,
              value: `10`,
            },
            NoteLength: {
              keyColumn: 52,
              valueColumn: 64,
              value: `7`,
            },
            BeatLength: {
              keyColumn: 67,
              valueColumn: 79,
              value: `4`,
            },
          },
        },
        {
          row: 11,
          type: `Channel`,
          typeColumn: 9,
          attributes: {
            Type: {
              keyColumn: 17,
              valueColumn: 23,
              value: `Square1`,
            },
          },
        },
        {
          row: 12,
          type: `Pattern`,
          typeColumn: 13,
          attributes: {
            Name: {
              keyColumn: 21,
              valueColumn: 27,
              value: `Intro1`,
            },
          },
        },
        {
          row: 13,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `0`,
            },
            Value: {
              keyColumn: 31,
              valueColumn: 38,
              value: `G3`,
            },
            Instrument: {
              keyColumn: 42,
              valueColumn: 54,
              value: `Lead`,
            },
          },
        },
        {
          row: 14,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `14`,
            },
            Value: {
              keyColumn: 32,
              valueColumn: 39,
              value: `A#3`,
            },
            Instrument: {
              keyColumn: 44,
              valueColumn: 56,
              value: `Lead`,
            },
          },
        },
        {
          row: 15,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `28`,
            },
            Value: {
              keyColumn: 32,
              valueColumn: 39,
              value: `G3`,
            },
            Instrument: {
              keyColumn: 43,
              valueColumn: 55,
              value: `Lead`,
            },
          },
        },
        {
          row: 16,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `42`,
            },
            Value: {
              keyColumn: 32,
              valueColumn: 39,
              value: `A#3`,
            },
            Instrument: {
              keyColumn: 44,
              valueColumn: 56,
              value: `Lead`,
            },
          },
        },
        {
          row: 17,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `63`,
            },
            Value: {
              keyColumn: 32,
              valueColumn: 39,
              value: `A#3`,
            },
            Instrument: {
              keyColumn: 44,
              valueColumn: 56,
              value: `Lead`,
            },
            SlideTarget: {
              keyColumn: 62,
              valueColumn: 75,
              value: `C4`,
            },
          },
        },
        {
          row: 18,
          type: `Pattern`,
          typeColumn: 13,
          attributes: {
            Name: {
              keyColumn: 21,
              valueColumn: 27,
              value: `Melody1`,
            },
          },
        },
        {
          row: 19,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `0`,
            },
            Value: {
              keyColumn: 31,
              valueColumn: 38,
              value: `C4`,
            },
            Instrument: {
              keyColumn: 42,
              valueColumn: 54,
              value: `Lead2`,
            },
            Volume: {
              keyColumn: 61,
              valueColumn: 69,
              value: `15`,
            },
          },
        },
        {
          row: 20,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `70`,
            },
            Value: {
              keyColumn: 32,
              valueColumn: 39,
              value: `D#4`,
            },
            Instrument: {
              keyColumn: 44,
              valueColumn: 56,
              value: `Lead2`,
            },
          },
        },
        {
          row: 21,
          type: `Note`,
          typeColumn: 17,
          attributes: {
            Time: {
              keyColumn: 22,
              valueColumn: 28,
              value: `98`,
            },
            Value: {
              keyColumn: 32,
              valueColumn: 39,
              value: `D4`,
            },
            Instrument: {
              keyColumn: 43,
              valueColumn: 55,
              value: `Lead2`,
            },
          },
        },
        {
          row: 22,
          type: `PatternInstance`,
          typeColumn: 9,
          attributes: {
            Time: {
              keyColumn: 25,
              valueColumn: 31,
              value: `0`,
            },
            Pattern: {
              keyColumn: 34,
              valueColumn: 43,
              value: `Intro1`,
            },
          },
        },
        {
          row: 23,
          type: `PatternInstance`,
          typeColumn: 9,
          attributes: {
            Time: {
              keyColumn: 25,
              valueColumn: 31,
              value: `1`,
            },
            Pattern: {
              keyColumn: 34,
              valueColumn: 43,
              value: `Melody1`,
            },
          },
        },
      ],
    },
  ]) {
    describe(`given ${successfulScenario.description}`, () => {
      withBothLineBreakTypes(successfulScenario.input, (input) => {
        let fragments: string[];

        beforeAll(() => {
          fragments = [];

          let remaining = input;

          while (remaining.length > 0) {
            const characters = Math.min(
              remaining.length,
              Math.ceil(Math.random() * 10)
            );

            fragments.push(remaining.slice(0, characters));

            remaining = remaining.slice(characters);
          }
        });

        describe(`as strings`, () => {
          let output: Line[];
          let onError: jasmine.Spy;
          let onEnd: jasmine.Spy;
          let onClose: jasmine.Spy;

          beforeAll(async () => {
            output = [];

            onError = jasmine.createSpy(`onError`);
            onEnd = jasmine.createSpy(`onEnd`);
            onClose = jasmine.createSpy(`onClose`);

            Readable.from(fragments)
              .pipe(new TextToLineTransform())
              .on(`data`, (chunk) => {
                output.push(...chunk);
              })
              .on(`error`, onError)
              .on(`end`, onEnd)
              .on(`close`, onClose);
          });

          it(`transforms to the expected lines`, () => {
            expect(output).toEqual(successfulScenario.output);
          });

          it(`does not throw an error`, () => {
            expect(onError).not.toHaveBeenCalled();
          });

          it(`ends once`, () => {
            expect(onEnd).toHaveBeenCalledTimes(1);
          });

          it(`closes once`, () => {
            expect(onClose).toHaveBeenCalledTimes(1);
          });

          it(`ends before closing`, () => {
            expect(onEnd).toHaveBeenCalledBefore(onClose);
          });
        });

        describe(`as buffers`, () => {
          let buffers: Buffer[];
          let output: Line[];
          let onError: jasmine.Spy;
          let onEnd: jasmine.Spy;
          let onClose: jasmine.Spy;

          beforeAll(async () => {
            buffers = fragments.map((fragment) => Buffer.from(fragment));

            output = [];

            onError = jasmine.createSpy(`onError`);
            onEnd = jasmine.createSpy(`onEnd`);
            onClose = jasmine.createSpy(`onClose`);

            Readable.from(buffers)
              .pipe(new TextToLineTransform())
              .on(`data`, (chunk) => {
                output.push(...chunk);
              })
              .on(`error`, onError)
              .on(`end`, onEnd)
              .on(`close`, onClose);
          });

          it(`does not modify the received buffers`, () => {
            for (let i = 0; i < fragments.length; i++) {
              expect(buffers[i]).toEqual(Buffer.from(fragments[i]));
            }
          });

          it(`transforms to the expected lines`, () => {
            expect(output).toEqual(successfulScenario.output);
          });

          it(`does not throw an error`, () => {
            expect(onError).not.toHaveBeenCalled();
          });

          it(`ends once`, () => {
            expect(onEnd).toHaveBeenCalledTimes(1);
          });

          it(`closes once`, () => {
            expect(onClose).toHaveBeenCalledTimes(1);
          });

          it(`ends before closing`, () => {
            expect(onEnd).toHaveBeenCalledBefore(onClose);
          });
        });
      });
    });
  }

  for (const unsuccessfulScenario of [
    {
      description: `a line break during a key`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" Attribu
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 37, `Unexpected line break during key`),
    },
    {
      description: `a line break between a key and an equals sign`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" AttributeBB\t
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 42, `Unexpected line break after key`),
    },
    {
      description: `a line break between an equals sign and a value`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" AttributeBB=
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 42, `Unexpected line break after key`),
    },
    {
      description: `a line break during a value`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" AttributeBB="Value B
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 50, `Unexpected line break during value`),
    },
    {
      description: `a missing key`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" ="Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 31, `Missing key`),
    },
    {
      description: `a missing key and equals sign`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" "Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 31, `Missing key`),
    },
    {
      description: `an attribute defined twice on the same line`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" AttributeBB="Value B B" AttributeBC="Value B C" AttributeBB="Value B D" AttributeBE="Value B E"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(
        2,
        79,
        `Attribute "AttributeBB" declared multiple times on the same line (previously at column 31)`
      ),
    },
    {
      description: `an attribute defined twice on the same line with spaces`,
      input: `TypeA AttributeAA = "Value A A" AttributeAB = "Value A B" AttributeAC = "Value A C"
TypeB AttributeBA = "Value B A" AttributeBB = "Value B B" AttributeBC = "Value B C" AttributeBB = "Value B D" AttributeBE = "Value B E"
TypeC AttributeCA = "Value C A" AttributeCB = "Value C B" AttributeCC = "Value C C"`,
      error: new FormatError(
        2,
        85,
        `Attribute "AttributeBB" declared multiple times on the same line (previously at column 33)`
      ),
    },
    {
      description: `an attribute with spaces in its key`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" Attribute BB="Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 40, `Unexpected character "B" after key`),
    },
    {
      description: `an attribute with characters between the equals sign and value`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" AttributeBB=Q"Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 43, `Unexpected character "Q" before value`),
    },
    {
      description: `the file abruptly ends`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeBA="Value B A" Attribut`,
      error: new FormatError(2, 38, `Unexpected line break during key`),
    },
    {
      description: `a line starts with an equals sign`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
=TypeB AttributeBA="Value B A" AttributeBB="Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 1, `Missing type and key`),
    },
    {
      description: `a line starts with a double quote`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
"TypeB AttributeBA="Value B A" AttributeBB="Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 1, `Missing type and key`),
    },
    {
      description: `a line's first attribute has no key`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB="Value B A" AttributeBB="Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 6, `Missing key`),
    },
    {
      description: `a line's first attribute has no key or equals sign`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB"Value B A" AttributeBB="Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 6, `Missing key`),
    },
    {
      description: `an attribute is missing an equals sign`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeAA="Value B A" AttributeBB"Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 42, `Missing equals sign`),
    },
    {
      description: `an attribute is missing an equals sign with a space`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeAA="Value B A" AttributeBB "Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 43, `Missing equals sign`),
    },
    {
      description: `an attribute has multiple equals signs`,
      input: `TypeA AttributeAA="Value A A" AttributeAB="Value A B" AttributeAC="Value A C"
TypeB AttributeAA="Value B A" AttributeBB=="Value B B" AttributeBC="Value B C"
TypeC AttributeCA="Value C A" AttributeCB="Value C B" AttributeCC="Value C C"`,
      error: new FormatError(2, 43, `Multiple equals signs`),
    },
  ]) {
    describe(`given ${unsuccessfulScenario.description}`, () => {
      withBothLineBreakTypes(unsuccessfulScenario.input, (input) => {
        let fragments: string[];

        beforeAll(() => {
          fragments = [];

          let remaining = input;

          while (remaining.length > 0) {
            const characters = Math.min(
              remaining.length,
              Math.ceil(Math.random() * 10)
            );

            fragments.push(remaining.slice(0, characters));

            remaining = remaining.slice(characters);
          }
        });

        describe(`as strings`, () => {
          let onError: jasmine.Spy;
          let onEnd: jasmine.Spy;
          let onClose: jasmine.Spy;

          beforeAll(async () => {
            onError = jasmine.createSpy(`onError`);
            onEnd = jasmine.createSpy(`onEnd`);
            onClose = jasmine.createSpy(`onClose`);

            Readable.from(fragments)
              .pipe(new TextToLineTransform())
              .on(`error`, onError)
              .on(`end`, onEnd)
              .on(`close`, onClose);
          });

          it(`throws the expected error`, () => {
            expect(onError).toHaveBeenCalledWith(unsuccessfulScenario.error);
          });

          it(`does not end`, () => {
            expect(onEnd).not.toHaveBeenCalled();
          });

          it(`closes once`, () => {
            expect(onClose).toHaveBeenCalledTimes(1);
          });
        });

        describe(`as buffers`, () => {
          let buffers: Buffer[];
          let onError: jasmine.Spy;
          let onEnd: jasmine.Spy;
          let onClose: jasmine.Spy;

          beforeAll(async () => {
            buffers = fragments.map((fragment) => Buffer.from(fragment));

            onError = jasmine.createSpy(`onError`);
            onEnd = jasmine.createSpy(`onEnd`);
            onClose = jasmine.createSpy(`onClose`);

            Readable.from(buffers)
              .pipe(new TextToLineTransform())
              .on(`error`, onError)
              .on(`end`, onEnd)
              .on(`close`, onClose);
          });

          it(`does not modify the received buffers`, () => {
            for (let i = 0; i < fragments.length; i++) {
              expect(buffers[i]).toEqual(Buffer.from(fragments[i]));
            }
          });

          it(`throws the expected error`, () => {
            expect(onError).toHaveBeenCalledWith(unsuccessfulScenario.error);
          });

          it(`does not end`, () => {
            expect(onEnd).not.toHaveBeenCalled();
          });

          it(`closes once`, () => {
            expect(onClose).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  }
});
