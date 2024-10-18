// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../features/userSlice";
import styles from "./EditUser.module.scss";

export default function EditUser() {
  // Hooks
  const dispatch = useDispatch(); // Pour envoyer des actions de maj de l'état global de l'app via fonction dispatch du store
  const navigate = useNavigate(); // Pour naviguer entre les routes

  // Récupérer les informations de l'utilisateur depuis le store
  const currentUser = useSelector((state) => state.user.currentUser);

  // État local pour gérer l'édition du nom d'utilisateur
  const [userName, setUserName] = useState(currentUser?.userName || "");

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("bouton save cliqué");
    // await dispatch(updateProfile({ userName })); // Envoie les nouvelles données
    // navigate("/profile");

    // Envoyer les nouvelles données au store Redux
    try {
      await dispatch(updateProfile({ userName }));

      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  const handleCancel = () => {
    // Réinitialiser le champ si l'utilisateur annule
    setUserName(currentUser?.userName || "");
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Edit user info</h1>
        <form className={styles.form} onSubmit={handleSave}>
          {/* Champ modifiable pour le nom d'utilisateur */}
          <div className={styles.formGroup}>
            <label htmlFor="userName">User Name :</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={styles.input}
            />
          </div>

          {/* Champ non modifiable pour le prénom */}
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name :</label>
            <input
              type="text"
              id="firstName"
              value={currentUser?.firstName || ""}
              readOnly
              className={`${styles.input} ${styles.disabledInput}`} // Ajout d'une classe pour le style grisé
            />
          </div>

          {/* Champ non modifiable pour le nom de famille */}
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name :</label>
            <input
              type="text"
              id="lastName"
              value={currentUser?.lastName || ""}
              readOnly
              className={`${styles.input} ${styles.disabledInput}`} // Ajout d'une classe pour le style grisé
            />
          </div>

          {/* Boutons Save et Cancel côte à côte */}
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className={styles.btnSave}
              // onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
