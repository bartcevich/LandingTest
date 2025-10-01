"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="py-[80px]"
    >
      <Image
        // className={styles.background_image}
        src={logo}
        alt="logo"
      />
    </motion.header>
  );
}
