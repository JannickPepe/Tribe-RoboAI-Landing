"use client";

import { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { animate, motion, useMotionTemplate, useMotionValue, HTMLMotionProps } from "framer-motion";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  block?: boolean;
  disabled?: boolean;
} & Omit<HTMLMotionProps<"button">, "ref">;

const classes = cva(
  "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg",
  {
    variants: {
      block: {
        true: "w-full",
      },
      variant: {
        primary: "border-gradient",
        secondary: "bg-gray-100 text-gray-950",
        tertiary: "bg-gray-800 text-gray-200",
        disabled: "text-gray-400 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "primary",
      block: false,
    },
  }
);

export const Button = ({ 
  className = "", 
  children, 
  variant = "primary", 
  block = false,
  onClick, // ✅ Explicitly extracting `onClick`
  ...otherProps 
}: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const angle = useMotionValue(45);
  const background = useMotionTemplate`linear-gradient(var(--color-gray-950),var(--color-gray-950)) padding-box, conic-gradient(from ${angle}deg,var(--color-violet-400),var(--color-fuchsia-400),var(--color-amber-300),var(--color-teal-300),var(--color-violet-400)) border-box`;

  useEffect(() => {
    if (isHovered) {
      animate(angle, angle.get() + 360, {
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      });
    } else {
      animate(angle, 45, { duration: 0.5 });
    }
  }, [isHovered, angle]);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={classes({ block, variant, className })}
      style={variant === "primary" ? { background: background } : undefined}
      disabled={otherProps.disabled}
      {...otherProps}
    >
      {children}
    </motion.button>
  );
};
