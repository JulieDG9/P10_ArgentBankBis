import { Link } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2>404</h2>
      <p>Oups! La page que vous demandez nexiste pas.</p>
      <Link to="/" className={styles.Link}>
        Retourner sur la page accueil
      </Link>
    </div>
  );
}
