"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const promotionItems = [
  { id: 1, text: "200", type: "number" },
  { id: 2, text: "ФРИСПИНОВ", type: "text" },
  { id: 3, text: "ЗА РЕГИСТРАЦИЮ", type: "text" },
];

export default function Promotion() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotionItems.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const playElectricSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Автоплей может быть заблокирован браузером
      });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-purple-900 to-blue-900 py-20">
      <audio ref={audioRef} preload="auto">
        <source src="/electric-sound.mp3" type="audio/mpeg" />
      </audio>

      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center space-x-8 mb-8">
          {promotionItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0.7,
                scale: index === currentIndex ? 1.2 : 1,
              }}
              transition={{ duration: 0.5 }}
              className={`text-6xl font-bold ${
                item.type === "number" ? "text-yellow-400" : "text-white"
              }`}
              onAnimationComplete={() => {
                if (item.type === "number" && index === currentIndex) {
                  playElectricSound();
                }
              }}
            >
              {item.text}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xl text-gray-300 mt-4"
        >
          Регистрируйтесь и получайте бонусы сразу!
        </motion.div>
      </div>
    </div>
  );
}
