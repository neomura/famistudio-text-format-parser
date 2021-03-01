import { firstConversionErrorOrAllOf } from ".";
import { ConversionError } from "../conversion-error";

type TestVariables = {
  testVariableAKey: string;
  testVariableBKey: string;
  testVariableCKey: string;
};

describe(`firstConversionErrorOrAllOf`, () => {
  describe(`when the object contains a conversion error`, () => {
    let conversionError: ConversionError;
    let output: ConversionError | TestVariables;

    beforeAll(() => {
      conversionError = new ConversionError(
        {
          row: 128,
          typeColumn: 36,
          type: `Test Type`,
          attributes: {
            testAttributeAKey: {
              keyColumn: 36,
              valueColumn: 72,
              value: `Test Attribute A Value`,
            },
            testAttributeBKey: {
              keyColumn: 108,
              valueColumn: 122,
              value: `Test Attribute B Value`,
            },
            testAttributeCKey: {
              keyColumn: 155,
              valueColumn: 178,
              value: `Test Attribute C Value`,
            },
          },
        },
        `Test Conversion Error`
      );

      output = firstConversionErrorOrAllOf<TestVariables>({
        testVariableAKey: `Test Variable A Value`,
        testVariableBKey: conversionError,
        testVariableCKey: `Test Variable C Value`,
      });
    });

    it(`returns the first conversion error`, () => {
      expect(output).toBe(conversionError);
    });
  });

  describe(`when the object does not contain a conversion error`, () => {
    let output:
      | ConversionError
      | {
          testVariableAKey: string;
          testVariableBKey: string;
          testVariableCKey: string;
        };

    beforeAll(() => {
      output = firstConversionErrorOrAllOf({
        testVariableAKey: `Test Variable A Value`,
        testVariableBKey: `Test Variable B Value`,
        testVariableCKey: `Test Variable C Value`,
      });
    });

    it(`returns the variables`, () => {
      expect(output).toEqual({
        testVariableAKey: `Test Variable A Value`,
        testVariableBKey: `Test Variable B Value`,
        testVariableCKey: `Test Variable C Value`,
      });
    });
  });
});
