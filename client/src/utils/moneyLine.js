const calculateWinnings = (moneyLine, amountBet) => {
  if (moneyLine > 0) {
    // positive money line indicates underdog
    return parseFloat((amountBet / (moneyLine / 100) + amountBet).toFixed(2));
  } else {
    // negative money line indicates favorite
    return parseFloat((amountBet + amountBet * (100 / moneyLine)).toFixed(2));
  }
};


const returnNegative = (bet) => {
  return bet * -1;
};

module.exports = {
  calculateWinnings,
  returnNegative,
};
