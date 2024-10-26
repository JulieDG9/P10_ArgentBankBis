/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "./EditUser.module.scss";

export default function EditUser({
  userName,
  firstName,
  lastName,
  onSave,
  onCancel,
}) {
  const [newUserName, setNewUserName] = useState(userName); // État pour le username

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      userName: newUserName,
    };
    onSave(updatedUser); // Appelle la fonction de rappel pour sauvegarder les modifications
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Edit user info</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="userName">User Name :</label>
          <input
            type="text"
            id="userName"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="firstName">First Name :</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            readOnly
            className={`${styles.input} ${styles.disabledInput}`} // Ajout d'une classe pour le style grisé
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName">Last Name :</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            readOnly
            className={`${styles.input} ${styles.disabledInput}`} // Ajout d'une classe pour le style grisé
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnSave}>
            Save
          </button>
          <button type="button" className={styles.btnCancel} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
