import { getBoolean } from ".";
import { Line } from "../../../line";
import { AttributeValue } from "../../../line/attribute-value";
import { ConversionError } from "../conversion-error";

describe(`getBoolean`, () => {
  for (const fallback of [false, true]) {
    describe(`fallback ${fallback}`, () => {
      for (const successfulScenario of [
        {
          description: `true`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `True`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: `True`,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `False`,
            },
          },
          output: true,
        },
        {
          description: `true padded`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `True`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: ` \n   \t   \r  True \n   \t   \r  `,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `False`,
            },
          },
          output: true,
        },
        {
          description: `false`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `True`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: `False`,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `False`,
            },
          },
          output: false,
        },
        {
          description: `false padded`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `True`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: ` \n   \t   \r  False \n   \t   \r  `,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `False`,
            },
          },
          output: false,
        },
      ]) {
        describe(successfulScenario.description, () => {
          let output: ConversionError | boolean;

          beforeAll(() => {
            output = getBoolean(
              {
                row: 128,
                typeColumn: 36,
                type: `Test Type`,
                attributes: successfulScenario.input,
              },
              `testAttributeBKey`,
              fallback
            );
          });

          it(`outputs as expected`, () => {
            expect(output).toEqual(successfulScenario.output);
          });
        });
      }

      for (const fallbackScenario of [
        {
          description: `missing`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `Test Attribute A Value`,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `Test Attribute C Value`,
            },
          } as { readonly [name: string]: AttributeValue },
        },
        {
          description: `empty`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `Test Attribute A Value`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: ``,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `Test Attribute C Value`,
            },
          },
        },
        {
          description: `white space`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `True`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: `        \n    \t        \r     `,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `False`,
            },
          },
        },
      ]) {
        describe(fallbackScenario.description, () => {
          let output: ConversionError | boolean;

          beforeAll(() => {
            output = getBoolean(
              {
                row: 128,
                typeColumn: 36,
                type: `Test Type`,
                attributes: fallbackScenario.input,
              },
              `testAttributeBKey`,
              fallback
            );
          });

          it(`outputs as expected`, () => {
            expect(output).toEqual(fallback);
          });
        });
      }

      for (const unsuccessfulScenario of [
        {
          description: `invalid`,
          input: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `Test Attribute A Value`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: `Test Invalid Value`,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `Test Attribute C Value`,
            },
          } as { readonly [name: string]: AttributeValue },
          output: `Attribute "testAttributeBKey" can only be "True" or "False" when given for line type "Test Type", but its value "Test Invalid Value" was not recognized`,
        },
      ]) {
        describe(unsuccessfulScenario.description, () => {
          let line: Line;
          let output: ConversionError | boolean;

          beforeAll(() => {
            line = {
              row: 128,
              typeColumn: 36,
              type: `Test Type`,
              attributes: unsuccessfulScenario.input,
            };

            output = getBoolean(line, `testAttributeBKey`, fallback);
          });

          it(`outputs as expected`, () => {
            expect(output).toEqual(
              new ConversionError(line, unsuccessfulScenario.output)
            );
          });
        });
      }
    });
  }
});
