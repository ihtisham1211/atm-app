import React, { forwardRef } from "react";

type Size = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  variant?: "default" | "ghost";
  children?: React.ReactNode;
  ariaLabel?: string;
};

const sizeMap: Record<Size, string> = {
  sm: "w-12 h-8",
  md: "w-14 h-9",
  lg: "w-16 h-10",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size = "sm", variant = "default", children, className = "", ...rest },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-md cursor-pointer disabled:bg-dark-grey disabled:cursor-not-allowed";
    const visual =
      "bg-button hover:bg-button/50 border-t-2 border-b-2 border-b-dark-grey border-t-dark-light shadow-md";
    const sizeCls = sizeMap[size];

    return (
      <button
        ref={ref}
        {...rest}
        className={[base, visual, sizeCls, className].join(" ")}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
