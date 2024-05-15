// Button.js
import React from "react";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  id,
  type,
  onClick,
  className,
  children,
  disabled,
}) => {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex justify-center ml-auto rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
