import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../../src/api/api";
// import { signOut } from "../app/redux/slices/authSlice";

const initialState = {
  currentUser: null,
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

// Action pour gérer la connexion
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      console.log("Tentative de connexion avec:", {
        email,
        password,
        rememberMe,
      });
      const userData = await loginUser(email, password, rememberMe);
      console.log("Données utilisateur récupérées:", userData);
      return userData;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Action pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async () => {
    return await getUserProfile();
  }
);

// Action asynchrone pour mettre à jour le profil utilisateur
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (updatedData) => {
    return await updateUserProfile(updatedData);
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null; // Réinitialise l'user
      // localStorage.removeItem("token"); // Supprime le token de localStorage
      sessionStorage.removeItem("token"); // Supprime le token de sessionStorage
    },
    updateProfile: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        userName: action.payload.body.username,
      };
    },
  },
  extraReducers(builder) {
    builder

      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Action payload:", action.payload);
        state.user = {
          ...action.payload.body,
          token: action.payload.body.token,
        }; // Maj user connecté
        state.status = "succeeded"; // Change l'état à succeeded

        if (action.payload.rememberMe) {
          localStorage.setItem("token", action.payload.body.token);
        } else {
          sessionStorage.setItem("token", action.payload.body.token);
        }
      })

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log("Profil utilisateur récupéré:", action.payload);
        state.user = action.payload.body; // Maj les données de l'user
        state.status = "succeeded";
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Gérer les erreurs
        console.error(
          "Erreur lors de la récupération du profil:",
          action.error
        );
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload.user; // Maj les données de l'user
      });
  },
});

// Export des actions et du reducer
export const { signOut } = userSlice.actions;
export default userSlice.reducer;
