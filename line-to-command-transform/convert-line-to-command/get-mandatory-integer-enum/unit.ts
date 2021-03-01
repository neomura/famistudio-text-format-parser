import { getMandatoryIntegerEnum } from ".";
import { Line } from "../../../line";
import { AttributeValue } from "../../../line/attribute-value";
import { ConversionError } from "../conversion-error";

type TestEnum = -12 | 23 | 6 | 0 | -4;

describe(`getMandatoryIntegerEnum`, () => {
  for (const successfulScenario of [
    {
      description: `unsigned`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `6`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: 6,
    },
    {
      description: `positive`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `+6`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: 6,
    },
    {
      description: `negative`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `-4`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: -4,
    },
    {
      description: `unsigned zero`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: 0,
    },
    {
      description: `positive zero`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `+0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: 0,
    },
    {
      description: `negative zero`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `-0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: 0,
    },
    {
      description: `padded unsigned`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: ` \n   \t   \r  6 \n   \t   \r  `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: 6,
    },
    {
      description: `padded positive`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: ` \n   \t   \r  +6 \n   \t   \r  `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: 6,
    },
    {
      description: `padded negative`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: ` \n   \t   \r  -4 \n   \t   \r  `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: -4,
    },
  ]) {
    describe(successfulScenario.description, () => {
      let output: ConversionError | TestEnum;

      beforeAll(() => {
        output = getMandatoryIntegerEnum<TestEnum>(
          {
            row: 128,
            typeColumn: 36,
            type: `Test Type`,
            attributes: successfulScenario.input,
          },
          `testAttributeBKey`,
          [-12, 23, 6, 0, -4]
        );
      });

      it(`outputs as expected`, () => {
        expect(output).toEqual(successfulScenario.output as TestEnum);
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
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an integer`,
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
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an integer`,
    },
    {
      description: `non-integer`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `Test Non-Integer`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an integer`,
    },
    {
      description: `integer starting with non-digit`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `Q391`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an integer`,
    },
    {
      description: `integer ending with non-digit`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `391Q`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an integer`,
    },
    {
      description: `integer containing non-digit`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `39Q1`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an integer`,
    },
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
          value: `15`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      } as { readonly [name: string]: AttributeValue },
      output: `Attribute "testAttributeBKey" can only be one of -12, 23, 6, 0, -4 for line type "Test Type", but its value 15 was not recognized`,
    },
  ]) {
    describe(unsuccessfulScenario.description, () => {
      let line: Line;
      let output: ConversionError | TestEnum;

      beforeAll(() => {
        line = {
          row: 128,
          typeColumn: 36,
          type: `Test Type`,
          attributes: unsuccessfulScenario.input,
        };

        output = getMandatoryIntegerEnum<TestEnum>(line, `testAttributeBKey`, [
          -12,
          23,
          6,
          0,
          -4,
        ]);
      });

      it(`outputs as expected`, () => {
        expect(output).toEqual(
          new ConversionError(line, unsuccessfulScenario.output)
        );
      });
    });
  }
});
