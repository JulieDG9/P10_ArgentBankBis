import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("mongodb://localhost/argentBankDB", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Erreur de récupération des comptes"
      );
    }
  }
);

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    accounts: [],
    loading: false,
    error: null,
    user: null,
    token: null,
  },
  reducers: {
    signinSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.accounts = [];
      state.loading = false;
    },
  },
});

export const { signinSuccess, signOut } = accountSlice.actions;
export default accountSlice.reducer;
