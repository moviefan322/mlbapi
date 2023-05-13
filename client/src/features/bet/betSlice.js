import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import betService from "./betService";

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

// Get user bets
export const getBets = createAsyncThunk("bet/getBets", async (_, thunkAPI) => {
  console.log("getting bets");
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await betService.getBets(token);
  } catch (error) {
    const message =
      (error.response && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

// Get a single bet
export const getBet = createAsyncThunk(
  "bet/getBet",
  async (betId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await betService.getBet(betId, token);
    } catch (error) {
      const message =
        (error.response && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const betSlice = createSlice({
  name: "bet",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeBet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(placeBet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bet = action.payload;
      })
      .addCase(placeBet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bets = action.payload;
      })
      .addCase(getBets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getBet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bet = action.payload;
      })
      .addCase(getBet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = betSlice.actions;
export default betSlice.reducer;
