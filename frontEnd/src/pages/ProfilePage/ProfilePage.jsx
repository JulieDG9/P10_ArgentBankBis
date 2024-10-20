// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Account from "../../components/Account/Account";
import EditUser from "../../components/EditUser/EditUser";
import styles from "./ProfilePage.module.scss";

// Exemple de comptes simulés
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

  // Récupérer l'utilisateur et les comptes dans le store Redux
  const token = useSelector((state) => state.auth.token);
  const user = {
    userName:"TEMP",
    lastName: "FONTAINE",
    firstName: "Laura"
  }; //useSelector((state) => state.user);

  // Gestion de l'affichage du editForm
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(user?.userName || "");
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  useEffect(() => {
    if(!token){
        navigate('/login')
    }
})  
const handleSave = (e) => {
  e.preventDefault();
  //dispatch(updateProfile({ userName }));

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
