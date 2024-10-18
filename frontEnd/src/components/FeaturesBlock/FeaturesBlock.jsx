import styles from "./FeaturesBlock.module.scss";
import Feature from "../Feature/Feature";
import IconChat from "../../assets/icon-chat.png";
import IconMoney from "../../assets/icon-money.png";
import IconSecurity from "../../assets/icon-security.png";

export default function FeaturesBlock() {
  return (
    <section className={styles.featuresBlock}>
      <Feature
        image={IconChat}
        alt={"Premier point fort: Chat"}
        texteH2={<>You are our #1 priority </>}
        texte={
          <>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </>
        }
      />
      <Feature
        image={IconMoney}
        alt={"Deuxième point fort: Économies"}
        texteH2={<>More savings means higher rates </>}
        texte={
          <>The more you save with us, the higher your interest rate will be!</>
        }
      />
      <Feature
        image={IconSecurity}
        alt={"Troisième point fort: Sécurité"}
        texteH2={<>Security you can trust </>}
        texte={
          <>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </>
        }
      />
    </section>
  );
}
