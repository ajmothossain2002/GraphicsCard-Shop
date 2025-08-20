"use client";
import React from "react";
import ColourfulText from "../ui/colourful-text";
import { motion } from "motion/react";

export function ColourfulTextDemo() {
  return (
    <div className="h-max w-full flex items-center justify-center relative overflow-hidden bg-black">
      <motion.img
        src="https://assets.nvidia.partners/images/png/RTX5070STPL_IN.png"
        className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
      <h1 className="text-1xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        <ColourfulText text="RTX 4070 Super Founder Edition" /> <br />
      </h1>
    </div>
  );
}
