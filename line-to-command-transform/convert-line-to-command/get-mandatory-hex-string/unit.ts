import { getMandatoryHexString } from ".";
import { Line } from "../../../line";
import { AttributeValue } from "../../../line/attribute-value";
import { U4 } from "../../../u4";
import { ConversionError } from "../conversion-error";

describe(`getMandatoryHexString`, () => {
  for (const successfulScenario of [
    {
      description: `valid`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `a38F4D56E8b7c102`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [10, 3, 8, 15, 4, 13, 5, 6, 14, 8, 11, 7, 12, 1, 0, 2],
    },
    {
      description: `padded`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: ` \n   \t   \r  a38F4D56E8b7c102 \n   \t   \r  `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [10, 3, 8, 15, 4, 13, 5, 6, 14, 8, 11, 7, 12, 1, 0, 2],
    },
  ]) {
    describe(successfulScenario.description, () => {
      let output: ConversionError | ReadonlyArray<U4>;

      beforeAll(() => {
        output = getMandatoryHexString(
          {
            row: 128,
            typeColumn: 36,
            type: `Test Type`,
            attributes: successfulScenario.input,
          },
          `testAttributeBKey`
        );
      });

      it(`outputs as expected`, () => {
        expect(output).toEqual(
          successfulScenario.output as ConversionError | ReadonlyArray<U4>
        );
      });
    });
  }

  for (const unsuccessfulScenario of [
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
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but it was not given`,
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
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain hexadecimal characters`,
    },
    {
      description: `white space`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `        \n    \t        \r     `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain hexadecimal characters`,
    },
    {
      description: `ending with invalid character`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `a38F4D56E8b7c102g`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain hexadecimal characters`,
    },
    {
      description: `containing invalid character`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `a38F4D56gE8b7c102`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain hexadecimal characters`,
    },
    {
      description: `starting with invalid character`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `ga38F4D56E8b7c102`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain hexadecimal characters`,
    },
  ]) {
    describe(unsuccessfulScenario.description, () => {
      let line: Line;
      let output: ConversionError | ReadonlyArray<U4>;

      beforeAll(() => {
        line = {
          row: 128,
          typeColumn: 36,
          type: `Test Type`,
          attributes: unsuccessfulScenario.input,
        };

        output = getMandatoryHexString(line, `testAttributeBKey`);
      });

      it(`outputs as expected`, () => {
        expect(output).toEqual(
          new ConversionError(line, unsuccessfulScenario.output)
        );
      });
    });
  }
});
