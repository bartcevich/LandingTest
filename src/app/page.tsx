import Header from "@/components/Header";
import Promotion from "@/components/Promotion";
import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="w-full max-w-[1920px] mx-auto min-h-[1080px] bg-white overflow-hidden">
        <Header />
        <Promotion />
        <RegistrationForm />

        {/* Дополнительная информация */}
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>Камера телефона +375 29 12...</p>
          <p className="mt-2 text-sm">
            *Бонусы доступны только для новых пользователей
          </p>
        </div>
      </div>
    </main>
  );
}
