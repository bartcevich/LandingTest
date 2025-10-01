import Header from "@/components/Header";
import Promotion from "@/components/Promotion";
import RegistrationForm from "@/components/RegistrationForm";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <div className={styles.registration}>
        <RegistrationForm />
      </div>
      <div className={styles.content}>
        <Header />
        <Promotion />
      </div>
    </main>
  );
}
