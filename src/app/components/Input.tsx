"use client";
import React, { useState } from "react";
import { useFormContext } from "../FormProvider";

interface InputProps {
  label: string;
  placeholder: string;
  keyValue: string;
  inputType?: string;
}

const Input = ({
  label,
  placeholder,
  keyValue,
  inputType = "text",
}: InputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const { setFormData } = useFormContext();
  // const [inputValue, setInputValue] = useState(formData[keyValue]);

  return (
    <div className="flex flex-col">
      <label
        className={`text-xs text-slate-400 ${
          isFocused && "text-slate-950"
        } transition-all duration-300`}
      >
        {label}
      </label>
      <input
        className="border border-slate-400 outline-none text-slate-950 px-2 py-1 text-xs focus:border-slate-950 placeholder:text-xs transition-all duration-300"
        placeholder={placeholder}
        // value={inputValue}
        type={inputType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => {
          const newInputValue = e.target.value;
          // setInputValue(newInputValue);
          setFormData((prev) => ({ ...prev, [keyValue]: newInputValue }));
        }}
      ></input>
    </div>
  );
};

export default Input;
