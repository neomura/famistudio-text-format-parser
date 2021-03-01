import { getOptionalEnum } from ".";
import { Line } from "../../../line";
import { AttributeValue } from "../../../line/attribute-value";
import { ConversionError } from "../conversion-error";

type TestEnum =
  | `Test Enum Value A`
  | `Test Enum Value B`
  | `Test Enum Value C`
  | `Test Enum Value D`
  | `Test Enum Value E`;

describe(`getOptionalEnum`, () => {
  for (const successfulScenario of [
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
      output: null,
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
      output: null,
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
      output: null,
    },
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
          value: `Test Enum Value D`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Test Enum Value D`,
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
          value: ` \n   \t   \r  Test Enum Value D \n   \t   \r  `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Test Enum Value D`,
    },
  ]) {
    describe(successfulScenario.description, () => {
      let output: ConversionError | null | TestEnum;

      beforeAll(() => {
        output = getOptionalEnum<TestEnum>(
          {
            row: 128,
            typeColumn: 36,
            type: `Test Type`,
            attributes: successfulScenario.input,
          },
          `testAttributeBKey`,
          [
            `Test Enum Value A`,
            `Test Enum Value B`,
            `Test Enum Value C`,
            `Test Enum Value D`,
            `Test Enum Value E`,
          ]
        );
      });

      it(`outputs as expected`, () => {
        expect(output).toEqual(successfulScenario.output as TestEnum);
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
      output: `Attribute "testAttributeBKey" can only be one of "Test Enum Value A", "Test Enum Value B", "Test Enum Value C", "Test Enum Value D", "Test Enum Value E" when given for line type "Test Type", but its value "Test Invalid Value" was not recognized`,
    },
  ]) {
    describe(unsuccessfulScenario.description, () => {
      let line: Line;
      let output: ConversionError | null | string;

      beforeAll(() => {
        line = {
          row: 128,
          typeColumn: 36,
          type: `Test Type`,
          attributes: unsuccessfulScenario.input,
        };

        output = getOptionalEnum<TestEnum>(line, `testAttributeBKey`, [
          `Test Enum Value A`,
          `Test Enum Value B`,
          `Test Enum Value C`,
          `Test Enum Value D`,
          `Test Enum Value E`,
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
