import axios from "axios";

const API_URL = "http://localhost:3000/api/bets/";

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

const betService = {
  placeBet,
  getBets,
  getBet,
};

export default betService;
