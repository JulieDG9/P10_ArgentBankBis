import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <p className={styles.copyright}>Copyright 2020 Argent Bank</p>
    </footer>
  );
}
