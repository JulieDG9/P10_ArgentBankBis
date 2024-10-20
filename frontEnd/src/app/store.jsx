import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./slices/authSlice";
import userSliceReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: userSliceReducer,
  },
});

export default store;
