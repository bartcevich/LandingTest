import Header from "@/components/Header";
import Promotion from "@/components/Promotion";
import RegistrationForm from "@/components/RegistrationForm";
import styles from "./home.module.css";
import Image from "next/image";
import sidebarImage from "@/assets/images/gold-min.png";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <div className={styles.registration}>
        <div className={styles.sidebarImage}>
          <Image src={sidebarImage} alt="logo" />
        </div>
        <RegistrationForm />
      </div>
      <div className={styles.content}>
        <Header />
        <Promotion />
      </div>
    </main>
  );
}
