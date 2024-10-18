import styles from "./Banner.module.scss";
// import imgBanner from "../../assets/bank-tree.webp";

export default function Banner() {
  return (
    <div className={styles.banner}>
      {/* <img
        src={imgBanner}
        alt={"Bannière page accueil"}
        className={styles.imgBanner}
      /> */}
      <div className={styles.block}>
        <h1>
          No fees.
          <br />
          No minimum deposit.
          <br />
          High interest rates.
        </h1>
        <p>Open a savings account with Argent Bank today!</p>
      </div>
    </div>
  );
}
