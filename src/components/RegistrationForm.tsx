"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setLoading, setError, setSuccess, resetForm } from "@/store/formSlice";
import { RootState } from "@/store";
import Image from "next/image";
import sidebarImage from "@/assets/images/ic-phone.svg";
import PasswordInput from "./PasswordInput";
import CheckboxItem from "./CheckboxItem";
import ButtonSubmit from "./ButtonSubmit";
import styles from "./RegistrationForm.module.scss";

interface FormData {
  phone: string;
  password: string;
  agreement1: boolean;
  agreement2: boolean;
}

export default function RegistrationForm() {
  const dispatch = useAppDispatch();
  const { isLoading, error, success } = useSelector(
    (state: RootState) => state.form
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      phone: "",
      password: "",
      agreement1: false,
      agreement2: false,
    },
  });

  const formData = watch();

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
    } else if (value.startsWith("80")) {
      value = "375" + value.substring(2);
      value = value.substring(0, 12);
      const formatted = formatPhoneNumber(value);
      setValue("phone", formatted);
    }
  };

  const validatePhone = (value: string): boolean | string => {
    if (!value) return "Поле обязательно для заполнения";

    const numbers = value.replace(/\D/g, "");

    if (!/^\d+$/.test(numbers)) {
      return "Допустимы только числовые символы";
    }

    if (!numbers.startsWith("375") || numbers.length !== 12) {
      return "Введите корректный номер телефона";
    }

    return true;
  };

  const validatePassword = (value: string): boolean | string => {
    if (!value) return "Поле обязательно для заполнения";
    if (value.length < 6) return "Пароль должен содержать минимум 6 символов";
    return true;
  };

  const validateAgreement = (
    value: boolean,
    fieldName: string
  ): boolean | string => {
    if (!value) return `Необходимо согласие с ${fieldName}`;
    return true;
  };

  const onSubmit = async (data: FormData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Валидация
      const phoneValid = validatePhone(data.phone);
      const passwordValid = validatePassword(data.password);
      const agreement1Valid = validateAgreement(data.agreement1, "правилами");
      const agreement2Valid = validateAgreement(
        data.agreement2,
        "условиями бонуса"
      );

      if (phoneValid !== true) throw new Error(phoneValid as string);
      if (passwordValid !== true) throw new Error(passwordValid as string);
      if (agreement1Valid !== true) throw new Error(agreement1Valid as string);
      if (agreement2Valid !== true) throw new Error(agreement2Valid as string);

      dispatch(setSuccess(true));
      setValue("phone", "");
      dispatch(resetForm());

      setTimeout(() => {
        dispatch(setSuccess(true));
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
    <div className={styles.sidebar}>
      {isLoading && (
        <div className={styles.sidebarLoader}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
          />
        </div>
      )}

      <div className={styles.form}>
        <h2 className={styles.formTitle}>Регистрация</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Поле телефона */}
          <div className={styles.formItem}>
            <label htmlFor="phoneInput" className="text-white mb-2 text-[13px]">
              Номер телефона
            </label>
            <div className="relative">
              <div className={styles.formImage}>
                <Image src={sidebarImage} alt="Phone icon" />
              </div>
              <input
                id="phoneInput"
                {...register("phone", {
                  required: "Поле обязательно для заполнения",
                  validate: validatePhone,
                  onChange: handlePhoneChange,
                })}
                type="text"
                placeholder="+375 29 123 45 67"
                className={styles.formPhone}
                disabled={isLoading}
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={styles.errorText}
                >
                  {errors.phone.message}
                </motion.p>
              )}
            </div>
          </div>

          {/* Поле пароля */}
          <PasswordInput
            value={formData.password}
            onChange={(value) => setValue("password", value)}
            isError={!!errors.password}
            errorMessage={error || undefined}
            placeholder="Пароль"
            label="Пароль"
            id="passwordInput"
          />

          {/* Чекбоксы */}
          <div className={styles.formCheckbox}>
            <div className="flex items-center">
              <CheckboxItem
                name="agreement1"
                label=""
                checked={formData.agreement1}
                onChange={(checked) => setValue("agreement1", checked)}
                isError={!!errors.agreement1}
                errorMessage={errors.agreement1?.message}
              />
              <div>
                <p>Мне больше 21 года.</p>
                <span>
                  Я согласен и принимаю <a href="#">«Правила приема ставок»</a>и{" "}
                  <a href="#">«Политику конфиденциальности»</a>
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <CheckboxItem
                name="agreement2"
                label=""
                checked={formData.agreement2}
                onChange={(checked) => setValue("agreement2", checked)}
                isError={!!errors.agreement2}
                errorMessage={errors.agreement2?.message}
              />
              <span>
                Я принимаю участие и согласен с <a href="#">условиями бонуса</a>
              </span>
            </div>
          </div>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-400 text-red-300 px-4 py-3 rounded mt-4"
            >
              <span>{error}</span>
            </motion.div>
          )}

          {/* Кнопка отправки */}
          <div className={styles.formButton}>
            <ButtonSubmit
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              // className="bg-green-500/20 border border-green-400 text-green-300 px-4 py-3 rounded mt-4"
            >
              <p className="ml-3 mt-5 text-red-600 text-xs mt-1 flex items-start">
                Пользователь с таким номером телефона уже существует
              </p>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
