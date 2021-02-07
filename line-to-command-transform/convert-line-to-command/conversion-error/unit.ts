import { ConversionError } from ".";

describe(`ConversionError`, () => {
  it(`generates the expected string`, () => {
    expect(
      new ConversionError(
        {
          row: 128,
          type: `Test Type`,
          typeColumn: 28,
          attributes: {
            testAttributeKeyA: {
              keyColumn: 51,
              valueColumn: 66,
              value: `Test Attribute Value A`,
            },
            testAttributeKeyB: {
              keyColumn: 121,
              valueColumn: 144,
              value: `Test Attribute Value B`,
            },
            testAttributeKeyC: {
              keyColumn: 188,
              valueColumn: 211,
              value: `Test Attribute Value C`,
            },
          },
        },
        `Test Message`
      ).toString()
    ).toEqual(`Error: Test Message on line 128.`);
  });
});
