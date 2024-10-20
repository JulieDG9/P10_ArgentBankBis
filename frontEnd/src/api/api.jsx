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
  } catch {
    throw new Error("Échec de la récupération du profil utilisateur");
  }
};

// Fonction pour mettre à jour le profil utilisateur
export const updateUserProfile = async (updatedData) => {
  try {
    const token = getToken();
    console.log("Token récupéré :", token); // Vérifie si le token est récupéré
    if (!token) throw new Error("Utilisateur non authentifié");

    // const response = await axios.put(`${urlApi}/user/profile`, updatedData, {
    const response = await axios.put(
      `${urlApi}/user/profile`,
      {
        userName: updatedData.userName, // N'envoie que userName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Réponse de l'API :", response.data); // Vérifie la réponse de l'API
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour du profil utilisateur :",
      error
    );

    throw new Error("Échec de la mise à jour du profil utilisateur");
  }
};
