import { firstConversionErrorOr } from ".";
import { ConversionError } from "../conversion-error";

type TestResult = `Test Result`;

describe(`firstConversionErrorOr`, () => {
  describe(`when the object contains a conversion error`, () => {
    let conversionError: ConversionError;
    let callback: jasmine.Spy;
    let output: ConversionError | TestResult;

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

      callback = jasmine.createSpy(`callback`);

      output = firstConversionErrorOr(
        {
          testVariableAKey: `Test Variable A Value`,
          testVariableBKey: conversionError,
          testVariableCKey: `Test Variable C Value`,
        },
        callback
      );
    });

    it(`does not execute the callback`, () => {
      expect(callback).not.toHaveBeenCalled();
    });

    it(`returns the first conversion error`, () => {
      expect(output).toBe(conversionError);
    });
  });

  describe(`when the object does not contain a conversion error`, () => {
    let callback: jasmine.Spy;
    let output: ConversionError | TestResult;

    beforeAll(() => {
      callback = jasmine.createSpy(`callback`).and.returnValue(`Test Result`);

      output = firstConversionErrorOr(
        {
          testVariableAKey: `Test Variable A Value`,
          testVariableBKey: `Test Variable B Value`,
          testVariableCKey: `Test Variable C Value`,
        },
        callback
      );
    });

    it(`executes the callback once`, () => {
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it(`passes the object to the callback`, () => {
      expect(callback).toHaveBeenCalledWith({
        testVariableAKey: `Test Variable A Value`,
        testVariableBKey: `Test Variable B Value`,
        testVariableCKey: `Test Variable C Value`,
      });
    });

    it(`returns the result of the callback`, () => {
      expect(output).toEqual(`Test Result`);
    });
  });
});
