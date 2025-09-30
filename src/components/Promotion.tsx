"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import advertisementImage from "@/assets/images/advertisement.webp";

export default function Promotion() {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center overflow-hidden md:items-center">
      <motion.div
        className="w-[110%] mt-[63px] sm:w-[70%] md:mt-[-20px] md:w-[42.7%] md:max-h-[456px]"
        animate={{
          scale: [1, 1.1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src={advertisementImage}
          alt="advertisement"
          className="w-full h-auto"
          // className="w-[500px] h-auto"
          priority
        />
      </motion.div>
    </div>
  );
}
