import Header from "@/components/Header";
import Promotion from "@/components/Promotion";
import RegistrationForm from "@/components/RegistrationForm";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <div
        // className={`w-full max-w-[1920px] mx-auto min-h-[1080px] overflow-hidden ${styles.content}`}
        className={styles.content}
      >
        <Header />
        <Promotion />

        <div className={styles.registration}>
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}
