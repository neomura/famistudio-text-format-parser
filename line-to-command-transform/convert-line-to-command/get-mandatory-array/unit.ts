import { getMandatoryArray } from ".";
import { Line } from "../../../line";
import { AttributeValue } from "../../../line/attribute-value";
import { ConversionError } from "../conversion-error";

type TestInteger = -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

describe(`getMandatoryArray`, () => {
  for (const successfulScenario of [
    {
      description: `minimum`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `-4,0,0,0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [-4, 0, 0, 0],
    },
    {
      description: `zero`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `0,0,0,0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [0, 0, 0, 0],
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
          value: `-0,0,0,0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [0, 0, 0, 0],
    },
    {
      description: `maximum`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `7,0,0,0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [7, 0, 0, 0],
    },
    {
      description: `signed maximum`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `+7,0,0,0`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [7, 0, 0, 0],
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
          value: ` \n   \t   \r  4 \n   \t   \r  ,0,0,0 \n \n \t \r `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [4, 0, 0, 0],
    },
    {
      description: `multiple`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `4,-3,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [4, -3, 0, 2],
    },
    {
      description: `multiple padded`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `   \n   \t   \r  4 \r \r \t    ,  \r \r \t \n  -3    \n \r \t,   \t \n   0  \r \r \n , \n \r 2 \t \t \t \n `,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: [4, -3, 0, 2],
    },
  ]) {
    describe(successfulScenario.description, () => {
      let output: ConversionError | ReadonlyArray<TestInteger>;

      beforeAll(() => {
        output = getMandatoryArray<TestInteger>(
          {
            row: 128,
            typeColumn: 36,
            type: `Test Type`,
            attributes: successfulScenario.input,
          },
          `testAttributeBKey`,
          -4,
          7,
          3,
          5
        );
      });

      it(`outputs as expected`, () => {
        expect(output).toEqual(
          successfulScenario.output as
            | ConversionError
            | ReadonlyArray<TestInteger>
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
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but it was not given`,
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
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but it was not given`,
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
          value: `4,-3,Test Non-Integer,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an array of integers`,
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
          value: `4,-3,Q391,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an array of integers`,
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
          value: `4,-3,391Q,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an array of integers`,
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
          value: `4,-3,39Q1,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an array of integers`,
    },
    {
      description: `less than minimum`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `4,-3,-5,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" must contain values greater than or equal to -4 for line type "Test Type", but one of its values is -5`,
    },
    {
      description: `greater than maximum`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `4,-3,8,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" must contain values less than or equal to 7 for line type "Test Type", but one of its values is 8`,
    },
    {
      description: `too few`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `4,-3`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" cannot contain fewer than 3 items for line type "Test Type", but only 2 were given`,
    },
    {
      description: `too many`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `4,-3,4,0,2,7`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" cannot contain more than 5 items for line type "Test Type", but 6 were given`,
    },
    {
      description: `empty value`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `4,-3,,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an array of integers`,
    },
    {
      description: `white space value`,
      input: {
        testAttributeAKey: {
          keyColumn: 36,
          valueColumn: 72,
          value: `Test Attribute A Value`,
        },
        testAttributeBKey: {
          keyColumn: 108,
          valueColumn: 122,
          value: `4,-3,       \t         \n  \r        ,0,2`,
        },
        testAttributeCKey: {
          keyColumn: 155,
          valueColumn: 178,
          value: `Test Attribute C Value`,
        },
      },
      output: `Attribute "testAttributeBKey" is mandatory for line type "Test Type", but its value does not contain an array of integers`,
    },
  ]) {
    describe(unsuccessfulScenario.description, () => {
      let line: Line;
      let output: ConversionError | ReadonlyArray<TestInteger>;

      beforeAll(() => {
        line = {
          row: 128,
          typeColumn: 36,
          type: `Test Type`,
          attributes: unsuccessfulScenario.input,
        };

        output = getMandatoryArray<TestInteger>(
          line,
          `testAttributeBKey`,
          -4,
          7,
          3,
          5
        );
      });

      it(`outputs as expected`, () => {
        expect(output).toEqual(
          new ConversionError(line, unsuccessfulScenario.output)
        );
      });
    });
  }
});
