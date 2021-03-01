import { firstConversionErrorOrHeaderAndAllOf } from ".";
import { ConversionError } from "../conversion-error";

type TestCombined = {
  testHeaderAKey: string;
  testHeaderBKey: string;
  testHeaderCKey: string;
  testVariableAKey: string;
  testVariableBKey: string;
  testVariableCKey: string;
};

describe(`firstConversionErrorOrHeaderAndAllOf`, () => {
  describe(`when the object contains a conversion error`, () => {
    let conversionError: ConversionError;
    let output: ConversionError | TestCombined;

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

      output = firstConversionErrorOrHeaderAndAllOf<
        TestCombined,
        `testHeaderAKey` | `testHeaderBKey` | `testHeaderCKey`
      >(
        {
          testHeaderAKey: `Test Header A Value`,
          testHeaderBKey: `Test Header B Value`,
          testHeaderCKey: `Test Header C Value`,
        },
        {
          testVariableAKey: `Test Variable A Value`,
          testVariableBKey: conversionError,
          testVariableCKey: `Test Variable C Value`,
        }
      );
    });

    it(`returns the first conversion error`, () => {
      expect(output).toBe(conversionError);
    });
  });

  describe(`when the object does not contain a conversion error`, () => {
    let output: ConversionError | TestCombined;

    beforeAll(() => {
      output = firstConversionErrorOrHeaderAndAllOf<
        TestCombined,
        `testHeaderAKey` | `testHeaderBKey` | `testHeaderCKey`
      >(
        {
          testHeaderAKey: `Test Header A Value`,
          testHeaderBKey: `Test Header B Value`,
          testHeaderCKey: `Test Header C Value`,
        },
        {
          testVariableAKey: `Test Variable A Value`,
          testVariableBKey: `Test Variable B Value`,
          testVariableCKey: `Test Variable C Value`,
        }
      );
    });

    it(`returns the combined object`, () => {
      expect(output).toEqual({
        testHeaderAKey: `Test Header A Value`,
        testHeaderBKey: `Test Header B Value`,
        testHeaderCKey: `Test Header C Value`,
        testVariableAKey: `Test Variable A Value`,
        testVariableBKey: `Test Variable B Value`,
        testVariableCKey: `Test Variable C Value`,
      });
    });
  });
});
