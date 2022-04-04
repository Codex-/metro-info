import { propertyToArray } from "./utils";

describe("propertyToArray", () => {
  it("returns an empty array when provided undefined", () => {
    const array = propertyToArray(undefined);

    expect(array).toEqual([]);
  });

  it("returns an array when provided false", () => {
    const array = propertyToArray(false);

    expect(array).toEqual([false]);
  });

  it("returns the original parameter if it is already an array", () => {
    const testArray = [1, 2, 3];
    const array = propertyToArray(testArray);

    expect(array).toBe(testArray);
  });

  it("returns the original parameter if it is already an empty array", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testArray: any[] = [];
    const array = propertyToArray(testArray);

    expect(array).toBe(testArray);
  });
});
