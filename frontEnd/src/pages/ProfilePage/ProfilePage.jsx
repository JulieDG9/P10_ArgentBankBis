// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateProfile } from "../../features/userSlice";
import Account from "../../components/Account/Account";
import EditUser from "../../components/EditUser/EditUser";
import styles from "./ProfilePage.module.scss";

// Exemple de comptes simulés
const mockAccounts = [
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

  // Récupérer l'utilisateur et les comptes dans le store Redux
  const user = useSelector((state) => state.user.user);
  const status = useSelector((state) => state.user.status);
  console.log(user);

  // Gestion de l'affichage du editForm
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  console.log(userName);
  console.log(firstName);
  console.log(lastName);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUserProfile());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (user) {
      setUserName(user.userName);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  // Vérifie si les données utilisateur sont chargées
  if (status === "loading") {
    return <p>Chargement...</p>; // Affiche un état de chargement
  }

  if (!user) {
    return (
      <p>Erreur : Impossible de récupérer les données de l utilisateur.</p>
    ); // Gère les erreurs si les données ne sont pas disponibles
  }

  // On vérifie que le token existe avant de l'utiliser
  const token = user?.token; // Utilisation de l'opérateur optionnel `?`
  if (!token) {
    return <p>Erreur : Token non trouvé pour l utilisateur.</p>;
  }

  // Si les données sont disponibles, affiche le profil
  const accounts = user.accounts || mockAccounts;

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ userName }));

    setUserName(userName);

    setIsEditing(false);
  };
  return (
    <>
      <div className={styles.bgPage}>
        <h1>Welcome back {userName || "Mister X"}!</h1>
        {!isEditing ? (
          <button className={styles.editBtn} onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        ) : (
          <EditUser
            userName={userName}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            firstName={firstName}
            lastName={lastName}
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
