import styles from "./Feature.module.scss";

// eslint-disable-next-line react/prop-types
export default function Feature({ image, alt, texteH2, texte }) {
  return (
    <section className={styles.banner}>
      <div className={styles.feature}>
        <img src={image} alt={alt} className={styles.iconFeature} />
      </div>
      <h2>{texteH2}</h2>
      <p>{texte}</p>
    </section>
  );
}
