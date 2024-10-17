import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import accountReducer from "../features/accountSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountReducer,
  },
});

export default store;
