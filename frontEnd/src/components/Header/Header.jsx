import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../assets/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { authOut } from "../../app/slices/authSlice";

export default function Header() {
  const token = useSelector((state) => state.auth.token);
  const userName = useSelector((state) => state.user.userName);
  console.log(userName);
  const dispatch = useDispatch();

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
              <Link to="/profile">
                <FontAwesomeIcon icon={faCircleUser} />
                {userName}
              </Link>
              <Link to="/" className="link_SignOut" onClick={handleSignOut}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Sign Out
              </Link>
            </>
          ) : (
            <Link to="/signin" className={styles.signIn}>
              <FontAwesomeIcon icon={faCircleUser} />
              Sign In
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
}
