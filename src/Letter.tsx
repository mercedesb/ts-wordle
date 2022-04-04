import React, { useState } from "react";
import { InputProps } from "./types";

export function Letter({
  inputProps,
  handleKeyUp,
}: {
  inputProps: InputProps;
  handleKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [value, setValue] = useState("");
  const { className, label, disabled, inputRef } = inputProps;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // only allow a single letter per input
    const lastLetter = event.target.value.slice(-1);
    setValue(lastLetter);
  };

  return (
    <label>
      <span className="sr-only">{label} letter</span>
      <input
        onKeyUp={handleKeyUp}
        onChange={onChange}
        ref={inputRef}
        value={value}
        disabled={disabled}
        type="text"
        className={`border border-gray-400 w-8 mx-1 rounded text-center font-bold uppercase ${className}`}
      />
    </label>
  );
}
