"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/images/logo.svg";

export default function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-start justify-center w-[40%] mt-[40px] sm:w-[70%] md:w-[100%]"
    >
      <Image src={logo} alt="logo" />
    </motion.div>
  );
}
