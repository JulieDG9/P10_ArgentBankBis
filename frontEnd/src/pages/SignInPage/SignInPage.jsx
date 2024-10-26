import SignIn from "../../components/SignIn/SignIn";
import styles from "./SignInPage.module.scss";

export default function SignInPage() {
  return (
    <div className={styles.bgPage}>
      <SignIn className={styles.signForm} />
    </div>
  );
}
