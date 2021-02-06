import { FormatError } from ".";

describe(`FormatError`, () => {
  it(`generates the expected string`, () => {
    expect(new FormatError(128, 36, `Test Message`).toString()).toEqual(
      `Error: Test Message at column 36 of line 128.`
    );
  });
});
