const { calculateTip } = require("../src/math");
test("The money have to pay ", () => {
  const total = calculateTip(10, 0.3);

  if (total !== 13) {
    throw new Error("Total should be 13");
  }
});
