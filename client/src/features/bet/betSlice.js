import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import betService from "../../services/betService";

const initialState = {
  bets: [],
  bet: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Place new bet
export const placeBet = createAsyncThunk(
  "bet/placeBet",
  async (betData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await betService.placeBet(betData, token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
