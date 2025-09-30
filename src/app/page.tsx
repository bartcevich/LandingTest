import Header from "@/components/Header";
import Promotion from "@/components/Promotion";
import RegistrationForm from "@/components/RegistrationForm";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.homepage}>
      <div
        className={`w-full max-w-[1920px] mx-auto min-h-[1080px] overflow-hidden ${styles.content}`}
      >
        <Header />
        <Promotion />
        <RegistrationForm />

        {/* Дополнительная информация */}
        <div className="container mx-auto px-4 py-8 text-center text-white">
          <p>Камера телефона +375 29 12...</p>
          <p className="mt-2 text-sm text-white/80">
            *Бонусы доступны только для новых пользователей
          </p>
        </div>
      </div>
    </main>
  );
}
