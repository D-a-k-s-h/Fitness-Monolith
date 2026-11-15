"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React from "react";

const getMeteorVariation = (index: number, seed: number) => {
  const value = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteors.map((el, idx) => {
        const meteorCount = number || 20;
        // Calculate position to evenly distribute meteors across container width
        const position = idx * (800 / meteorCount) - 400; // Spread across 800px range, centered
        const animationDelay = getMeteorVariation(idx, 1) * 5;
        const animationDuration =
          Math.floor(getMeteorVariation(idx, 2) * 5) + 5;

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "animate-meteor-effect absolute h-0.5 w-0.5 rotate-45 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-px before:w-12.5 before:translate-y-[-50%] before:transform before:bg-linear-to-r before:from-[#64748b] before:to-transparent before:content-['']",
              className,
            )}
            style={{
              top: "-40px", // Start above the container
              left: position + "px",
              animationDelay: animationDelay + "s",
              animationDuration: animationDuration + "s",
            }}
          ></span>
        );
      })}
    </motion.div>
  );
};
