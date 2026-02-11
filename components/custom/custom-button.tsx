"use client";
import React, { forwardRef, useRef, useEffect } from "react";
import clsx from "clsx";
import gsap from "gsap";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const baseStyles =
  "flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-tl from-orange-600 via-orange-500 to-yellow-400 text-white hover:from-orange-700 hover:to-yellow-500 hover:shadow-orange-400/50 shadow-2xl",
  secondary:
    "bg-gray-700 text-white hover:bg-gray-800 shadow-md hover:shadow-gray-500/30",
  outline: "border-2 border-orange-500 text-orange-600 hover:bg-orange-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
};

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ children, variant = "primary", size = "md", className, ...props }, ref) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);

    // Animate hover and click effects
    useEffect(() => {
      const el = btnRef.current;
      if (!el) return;

      const hoverIn = () => {
        gsap.to(el, {
          scale: 1.08,
          y: -3,
          boxShadow: "0 8px 20px rgba(255, 165, 0, 0.4)",
          duration: 0.2,
          ease: "power2.out",
        });
      };

      const hoverOut = () => {
        gsap.to(el, {
          scale: 1,
          y: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          duration: 0.2,
          ease: "power2.inOut",
        });
      };

      const clickAnim = () => {
        gsap.to(el, {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });
      };

      el.addEventListener("mouseenter", hoverIn);
      el.addEventListener("mouseleave", hoverOut);
      el.addEventListener("mousedown", clickAnim);

      return () => {
        el.removeEventListener("mouseenter", hoverIn);
        el.removeEventListener("mouseleave", hoverOut);
        el.removeEventListener("mousedown", clickAnim);
      };
    }, []);

    return (
      <button
        ref={(node) => {
          btnRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
