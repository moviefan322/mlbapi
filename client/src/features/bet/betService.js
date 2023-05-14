import axios from "axios";

const API_URL = "/api/bets/";

// Place a bet
const placeBet = async (betData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, betData, config);

  return response.data;
};

const getBets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const getBet = async (betId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}${betId}`, config);

  return response.data;
};

const updateBets = async (bets, token) => {
  console.log("bets from betService", bets)
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, bets, config);

  return response.data;
};

const betService = {
  placeBet,
  getBets,
  getBet,
  updateBets,
};

export default betService;
