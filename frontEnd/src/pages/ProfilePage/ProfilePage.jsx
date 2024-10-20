// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../api/api";
import { getUserSuccess, getUserRejected } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Account from "../../components/Account/Account";
import EditUser from "../../components/EditUser/EditUser";
import styles from "./ProfilePage.module.scss";

// Exemple de comptes
const accounts = [
  {
    title: "Argent Bank Checking (x8349)",
    balance: "$2,082.79",
    status: "Available Balance",
  },
  {
    title: "Argent Bank Savings (x6712)",
    balance: "$10,928.42",
    status: "Available Balance",
  },
  {
    title: "Argent Bank Credit Cards (x8349)",
    balance: "$184.30",
    status: "Current Balance",
  },
];

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer l'utilisateur et les comptes dans le store Redux
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);

  // Gestion de l'affichage du editForm
  const [isEditing, setIsEditing] = useState(false);
  // Gestion du message d'erreur
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
      return;
    }

    // Fonction pour récupérer les données de l'utilisateur
    const getUserData = async () => {
      try {
        const responseUser = await getUserProfile(); // Appel API pour récupérer le profil
        dispatch(getUserSuccess(responseUser.body)); // Dispatch les données utilisateur
      } catch (error) {
        dispatch(getUserRejected());
        setError("Échec dans la récupération du profil utilisateur");
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
      }
    };

    getUserData(); // Appel de la fonction
  }, [token, dispatch, navigate]);

  const handleSave = async (updatedUser) => {
    try {
      const updatedProfile = await updateUserProfile(updatedUser); // Mets à jour le profil via l'API
      dispatch(getUserSuccess(updatedProfile.body)); // Mets à jour le store avec les nouvelles données
      setIsEditing(false); // Ferme le mode d'édition
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };
  return (
    <>
      <div className={styles.bgPage}>
        <h1>Welcome back {user.userName || user.firstname || ""}!</h1>
        {error && <div className={styles.error}>{error}</div>}{" "}
        {/* Affiche les erreurs si présentes */}
        {!isEditing ? (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        ) : (
          <EditUser
            userName={user.userName}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            firstName={user.firstName}
            lastName={user.lastName}
          />
        )}
        <section className={styles.container}>
          {accounts.map((account, index) => (
            <Account className={styles.account} account={account} key={index} />
          ))}
        </section>
      </div>
    </>
  );
}
