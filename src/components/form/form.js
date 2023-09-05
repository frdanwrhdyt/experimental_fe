import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

export function InputForm({ value, onChange, type, placeholder, ref }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative w-full">
      <input
        className="peer placeholder-transparent h-10 w-full border-b border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
        type={showPassword ? "text" : type || "text"}
        value={value}
        id={placeholder}
        onChange={onChange}
        ref={ref}
        autoComplete={type === "password" ? "current-password" : ""}
        placeholder={placeholder}
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-2 top-2 text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
        </button>
      )}
      <label
        htmlFor={placeholder}
        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        {placeholder}
      </label>
    </div>
  );
}

export function ButtonForm({ type, text }) {
  return (
    <button
      type={type}
      className="bg-blue-600 w-full text-sm text-white py-2 px-4 rounded-md hover:bg-blue-700 duration-150 shadow shadow-blue-700 hover:shadow-sm"
    >
      {text}
    </button>
  );
}

InputForm.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.any,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
ButtonForm.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
};
