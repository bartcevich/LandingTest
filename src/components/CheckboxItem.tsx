"use client";

import { motion } from "framer-motion";

interface CheckboxItemProps {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isError?: boolean;
  errorMessage?: string;
}

export default function CheckboxItem({
  name,
  label,
  checked,
  onChange,
  isError = false,
  errorMessage,
}: CheckboxItemProps) {
  return (
    <div className="form-item mr-2">
      <label className="checkboxLabel flex items-start space-x-2 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="checkboxInput absolute opacity-0 w-0 h-0"
          />
          <div
            className={`w-5 h-5 border-2 rounded border-gray-300 flex items-center justify-center transition-all duration-200 ${
              checked
                ? "bg-[#5ab828] border-[#5ab828]"
                : "bg-white border-gray-300"
            }`}
          >
            {checked && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        </div>
        <span
          className="checkboxText flex-1 text-white text-sm leading-tight"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </label>
      {isError && errorMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="errorText text-red-400 text-xs mt-1"
        >
          {errorMessage}
        </motion.p>
      )}
    </div>
  );
}
