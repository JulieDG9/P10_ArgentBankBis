import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserSuccess: (state, action) => {
      // Si userName n'est pas défini, on utilise firstName par défaut comme nom d'utilisateur.
      state.userName = action.payload.userName || action.payload.firstName;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    getUserRejected: (state) => {
      state.userName = null;
      state.firstName = null;
      state.lastName = null;
    },
    updateUser: (state, action) => {
      state.userName = action.payload.userName;
    },
  },
});

export const { getUserSuccess, getUserRejected, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
