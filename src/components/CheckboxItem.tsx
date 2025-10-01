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
    <div className="form-item">
      <label className="checkboxLabel">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="checkboxInput"
        />
        <span
          className="checkboxText"
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </label>
      {isError && errorMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="errorText"
        >
          {errorMessage}
        </motion.p>
      )}
    </div>
  );
}
