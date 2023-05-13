import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import betReducer from "../features/bet/betSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bet: betReducer,
  },
});
