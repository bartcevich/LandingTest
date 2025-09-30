"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setPhone,
  setLoading,
  setError,
  setSuccess,
  resetForm,
} from "@/store/formSlice";
import { RootState } from "@/store";

interface FormData {
  phone: string;
}

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  const { phone, isLoading, error, success } = useSelector(
    (state: RootState) => state.form
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>();

  const formatPhoneNumber = (value: string): string => {
    const numbers = value.replace(/\D/g, "");

    if (numbers.startsWith("375")) {
      const match = numbers.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
      if (match) {
        return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
      }
    }

    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.startsWith("375")) {
      value = value.substring(0, 12);
      const formatted = formatPhoneNumber(value);
      setValue("phone", formatted);
      dispatch(setPhone(formatted));
    } else if (value.startsWith("80")) {
      value = "375" + value.substring(2);
      value = value.substring(0, 12);
      const formatted = formatPhoneNumber(value);
      setValue("phone", formatted);
      dispatch(setPhone(formatted));
    } else {
      dispatch(setPhone(value));
    }
  };

  const validatePhone = (value: string): boolean | string => {
    if (!value) return "Поле обязательно для заполнения";

    const numbers = value.replace(/\D/g, "");

    if (!/^\d+$/.test(numbers)) {
      return "Допустимы только числовые символы";
    }

    if (!numbers.startsWith("375") || numbers.length !== 12) {
      return "Введите корректный номер телефона в формате +375 29 123 45 67";
    }

    return true;
  };

  const onSubmit = async (data: FormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Проверка валидности телефона
      const isValid = validatePhone(data.phone);
      if (isValid !== true) {
        throw new Error(isValid as string);
      }

      dispatch(setSuccess(true));
      reset();
      dispatch(resetForm());

      // Сброс успеха через 3 секунды
      setTimeout(() => {
        dispatch(setSuccess(false));
      }, 3000);
    } catch (err) {
      dispatch(
        setError(err instanceof Error ? err.message : "Произошла ошибка")
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 mt-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Регистрация
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Номер телефона
          </label>
          <input
            {...register("phone", {
              required: "Поле обязательно для заполнения",
              validate: validatePhone,
              onChange: handlePhoneChange,
            })}
            type="text"
            id="phone"
            placeholder="+375 29 123 45 67"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          {errors.phone && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-2"
            >
              {errors.phone.message}
            </motion.p>
          )}
        </div>

        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-semibold">Перед регистрацией:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Подтвердите, что вам исполнилось 18 лет</li>
            <li>Ознакомьтесь с правилами и условиями</li>
            <li>Играйте ответственно</li>
          </ul>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
          >
            Регистрация успешно завершена! На ваш телефон отправлено SMS с
            подтверждением.
          </motion.div>
        )}

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
            />
          ) : (
            "Зарегистрироваться"
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
