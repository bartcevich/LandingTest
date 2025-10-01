"use client";

import { motion } from "framer-motion";

interface ButtonSubmitProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export default function ButtonSubmit({
  onClick,
  disabled = false,
  isLoading = false,
  children = "Зарегистрироваться",
}: ButtonSubmitProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:from-yellow-500 hover:to-orange-600"
      }`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
          />
          Отправка...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
