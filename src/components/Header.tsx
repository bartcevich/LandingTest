"use client";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full bg-gray-900 py-6"
    >
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl font-bold text-center text-yellow-400"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          CASINOBET
        </motion.h1>
      </div>
    </motion.header>
  );
}
