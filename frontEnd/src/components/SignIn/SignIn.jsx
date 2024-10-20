// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { loginUser } from "../../api/api";
import { authSuccess, authRejected } from '../../app/slices/authSlice';



export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseLogin = await loginUser(email, password, rememberMe);
      dispatch(authSuccess(responseLogin.body.token))
      navigate("/profile");
    } catch (error) {
      dispatch(authRejected());
      //TODO : Afficher l'erreur dans le formulaire (voir la deuxième todo de cette page)
      console.error("login failed", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <FontAwesomeIcon icon={faCircleUser} />
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputs}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              id="email"
              label="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={styles.text}
            />
          </div>
          <div className={styles.inputs}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              id="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          {/* TODO : Ajouter un message d'erreur caché du genre "Identifiants incorrects" */}
          <button type="submit" className={styles.btn}>
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}
