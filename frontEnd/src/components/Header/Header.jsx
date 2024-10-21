import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import styles from "./Header.module.scss";
import logo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { authOut } from "../../app/slices/authSlice";
import { getUserProfile } from "../../api/api";
import { getUserSuccess, getUserRejected } from "../../app/slices/userSlice";

export default function Header() {
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.user.userName);
  console.log(userName);
  const dispatch = useDispatch();

  // Fonction pour récupérer les données de l'utilisateur
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (token && !userName) {
          const responseUser = await getUserProfile(); // Appel API pour récupérer le profil
          dispatch(getUserSuccess(responseUser.body)); // Dispatch les données utilisateur
        }
      } catch (error) {
        dispatch(getUserRejected());
        console.error(
          "Erreur lors de la récupération des données utilisateur:",
          error
        );
      }
    };
    getUserData(); // Appel de la fonction
  }, [token, userName, dispatch]);

  const handleSignOut = () => {
    dispatch(authOut());
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/">
          <img src={logo} alt="Logo ArgentBank" />
        </Link>
        <nav>
          {token ? (
            <>
              <Link to="/profile" className={styles.userName}>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className={styles.userIcon}
                />
                {userName}
              </Link>
              <Link to="/" className={styles.signOut} onClick={handleSignOut}>
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className={styles.signOutIcon}
                />
                Sign Out
              </Link>
            </>
          ) : (
            <Link to="/signin" className={styles.signIn}>
              <FontAwesomeIcon
                icon={faCircleUser}
                className={styles.signInIcon}
              />
              Sign In
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
}
