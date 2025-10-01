"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ImageClose from "@/assets/images/ic-password-hide.svg";
import ImageOpen from "@/assets/images/ic-password-show.svg";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
  errorMessage?: string | null;
  placeholder?: string;
  label?: string;
  id?: string;
}

export default function PasswordInput({
  value,
  onChange,
  isError,
  errorMessage,
  placeholder = "Пароль",
  label,
  id = "password",
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessageToShow, setErrorMessageToShow] = useState<string | null>(
    null
  );
  const [isTouched, setIsTouched] = useState(false);

  // Внутренняя валидация пароля
  const validatePassword = useCallback(
    (password: string) => {
      if (isTouched) {
        if (!password) {
          setErrorMessageToShow("Поле обязательно для заполнения");
        } else if (password.length < 6) {
          setErrorMessageToShow("Пароль должен содержать минимум 6 символов");
        } else {
          setErrorMessageToShow("");
        }
      }
    },
    [isTouched]
  );

  useEffect(() => {
    validatePassword(value);
  }, [validatePassword, value]);

  const handleFocus = () => {
    setIsTouched(true);
  };

  return (
    <div className="form-item">
      {label && (
        <label htmlFor={id} className="text-white mb-2 text-[13px] block">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={`w-full h-[38px] px-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/90 pr-10 ${
            isError ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <Image src={ImageOpen} alt="Hide password" width={20} height={20} />
          ) : (
            <Image
              src={ImageClose}
              alt="Show password"
              width={20}
              height={20}
            />
          )}
        </button>
      </div>

      {/* Сообщение об ошибке */}
      {errorMessageToShow ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <p className="text-red-600 text-xs mt-1 flex items-start">
            <span>{errorMessageToShow}</span>
          </p>
        </motion.div>
      ) : (
        errorMessage && (
          <p className="text-red-600 text-xs mt-1 flex items-start">
            <span>{errorMessage}</span>
          </p>
        )
      )}
    </div>
  );
}
