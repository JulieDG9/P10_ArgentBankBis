// import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../features/userSlice";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/">
          <img src={logo} alt="Logo ArgentBank" />
        </Link>
        <nav>
          <FontAwesomeIcon icon={faCircleUser} />
          {user ? (
            <div>
              <Link to="/profile" className={styles.userName}>
                {user.userName || "Mister T"}
              </Link>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <button onClick={handleSignOut} className={styles.signOut}>
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/signin" className={styles.signIn}>
              Sign In
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
}
