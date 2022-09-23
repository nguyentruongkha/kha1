const calculateTip = (total, percentTip) => {
  const tip = total * percentTip;
  return tip + total;
};

module.exports = { calculateTip };
