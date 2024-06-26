// Input.js
import React from "react";
import { InputProps } from "./types";

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  id,
  required = false,
  error = "",
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          className={`block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
            error ? "border-red-500" : ""
          }`}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
