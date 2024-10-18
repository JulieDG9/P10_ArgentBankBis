/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "./Account.module.scss";

export default function Account({ account }) {
  return (
    <>
      <div className={styles.account}>
        <div className={styles.infosContainer}>
          <p className={styles.accountName}> {account.title}</p>
          <p className={styles.balance}>{account.balance}</p>
          <p className={styles.balanceStatus}>{account.status}</p>
        </div>
        <button type="submit" className={styles.btn}>
          View transactions
        </button>
      </div>
    </>
  );
}
