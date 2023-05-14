const calculateWinnings = (moneyLine, amountBet) => {
  if (moneyLine > 0) {
    // positive money line indicates underdog
    return parseFloat((amountBet * (moneyLine / 100)).toFixed(2));
  } else {
    // negative money line indicates favorite
    return parseFloat((amountBet / (-moneyLine / 100)).toFixed(2));
  }
};

const returnNegative = (bet) => {
  return bet * -1;
};

module.exports = {
  calculateWinnings,
  returnNegative,
};
