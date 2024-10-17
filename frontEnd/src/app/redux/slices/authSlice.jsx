import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signinUser = createAsyncThunk(
  "auth/signinUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userData
      );
      console.log("API Response:", response.data);
      return {
        user: response.data.body.user,
        token: response.data.body.token, // Retourne directement les données de réponse (token, user)
      };
    } catch (error) {
      return rejectWithValue(error.response.data); // Retourne le message d'erreur
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    token: null,
    error: null,
  },
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Utilisateur connecté
        state.token = action.payload.token; // Stockage du token
        console.log("token stored in state:", action.payload.token);
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message; // Message d'erreur en cas de rejet
        console.log("login error:", action.payload.message);
      });
  },
});

//     signinStart: (state) => {
//       state.loading = true;
//     },
//     signinSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//     },
//     signinFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     signOut: (state) => {
//       state.user = null;
//       state.token = null;
//       state.loading = false;
//     },
//   },
// });

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
