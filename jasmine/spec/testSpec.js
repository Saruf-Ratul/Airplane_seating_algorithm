describe("function parseInput", function() {
  it("transform input string to array", function() {
    expect(controller.parseInput('[[2,3 ],  [1,6]]')).toEqual([[2, 3], [1, 6]]);
    expect(controller.parseInput('[[1, 2], [1, 2]]')).toEqual([[1, 2], [1, 2]]);
    expect(controller.parseInput('[[1, 2], [2, 1]]')).toEqual([[1, 2], [2, 1]]);
    expect(controller.parseInput('[[0, 0]]')).toEqual([[0, 0]]);
    expect(controller.parseInput('[[a, b]]')).toEqual([[NaN, NaN]]);
    expect(controller.parseInput('[[-5, 123]]')).toEqual([[-5, 123]]);
    expect(controller.parseInput('fkh59403')).toEqual([[NaN]]);
  });
});

describe("function isInputValid", function() {
  it("check correct input", function() {
    expect(controller.isInputValid([[2,3], [1,6]], 3)).not.toBe(false);
  });
  it("check incorrect string to array", function() {
    expect(controller.isInputValid([[NaN, 3]], 34)).toBe(false);
  });
  it("check too long string to array", function() {
    expect(controller.isInputValid([[2,3], [1,6], [2,3], [1,6], [2,3], [1,6], [2,3], [1,6], [2,3], [1,6]], 34)).toBe(false);
  });
  it("check incorrect string to array", function() {
    expect(controller.isInputValid([[-5, 2], [1, 6]], 34)).toBe(false);
  });
  it("check incorrect queue", function() {
    expect(controller.isInputValid([[3, 2], [1, 6]], -34)).toBe(false);
  });
  it("check incorrect queue", function() {
    expect(controller.isInputValid([[3, 2], [1, 6]], 1.5)).toBe(false);
  });
});
