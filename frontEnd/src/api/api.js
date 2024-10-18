/* eslint-disable no-unused-vars */
import axios from "axios";

const urlApi = "http://localhost:3001/api/v1";

// Fonction pour récupérer le token depuis localStorage ou sessionStorage
const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

// Fonction pour connecter l'utilisateur
export const loginUser = async (email, password, rememberMe = false) => {
  try {
    // Envoi requête POST pour la connexion
    const response = await axios.post(`${urlApi}/user/login`, {
      email,
      password,
    });

    console.log("Données du serveur:", response.data);
    console.log("Réponse du serveur lors de la connexion:", response);

    // Récupération du token
    const token = response.data.body.token;

    if (!token) {
      throw new Error("Aucun token renvoyé par le serveur");
    }

    // Stocker le token dans localStorage ou sessionStorage selon "rememberMe"
    if (rememberMe) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    return response.data; // axios renvoie déjà les données JSON sans avoir besoin d'appeler .json()
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    throw new Error("Échec de la connexion" + error.message);
  }
};

// // Fonction pour inscrire un utilisateur (signup)
// export const signupUser = async (firstname, lastname, email, password) => {
//   try {
//     const response = await axios.post(`${urlApi}/user/signup`, {
//       firstname,
//       lastname,
//       email,
//       password,
//     });

//     return response.data;
//   } catch (error) {
//     throw new Error("Échec de l'inscription");
//   }
// };

// Fonction pour récupérer le profil utilisateur
export const getUserProfile = async () => {
  try {
    const token = getToken();
    console.log("Token récupéré:", token);
    if (!token) throw new Error("Utilisateur non authentifié");

    const response = await axios.get(`${urlApi}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Échec de la récupération du profil utilisateur");
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (updatedData) => {
  try {
    const token = getToken();
    console.log("Token récupéré :", token); // Vérifie si le token est récupéré
    if (!token) throw new Error("Utilisateur non authentifié");

    const response = await axios.put(`${urlApi}/user/profile`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // lorsque que try et catch sont actifs, ça me deconnecte
    console.log("Réponse de l'API :", response.data); // Vérifie la réponse de l'API
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du profil utilisateur :",
      error
    );
    alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");

    if (error.response && error.response.status === 401) {
      console.warn(
        "Token invalide ou expiré, mais ne pas déconnecter automatiquement."
      );
    }
    throw new Error("Échec de la mise à jour du profil utilisateur");
  }
};

// Fonction pour récupérer les comptes utilisateur
export const fetchAccounts = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("Utilisateur non authentifié");

    const response = await axios.get(`${urlApi}/accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; // axios gère la réponse JSON automatiquement
  } catch (error) {
    // Gérer l'erreur sans provoquer de déconnexion
    console.error(
      "Erreur lors de la mise à jour du profil utilisateur:",
      error
    );

    // Affiche un message à l'utilisateur ici sans forcer la déconnexion
    alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    if (error.response && error.response.status === 401) {
      console.warn(
        "Token invalide ou expiré, mais ne pas déconnecter automatiquement."
      );
    }

    // Si erreur 401, gére la situation sans forcer la déconnexion
    throw new Error("Échec de la récupération des comptes");
  }
};
