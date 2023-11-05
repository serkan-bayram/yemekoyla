"use client";

import Image from "next/image";
import { useState } from "react";

export default function InputWithPassword({
  isDisabled,
  placeholder,
  name,
  errorState,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  return (
    <div className="flex pr-4">
      <input
        disabled={isDisabled}
        required
        type={isVisible ? "text" : "password"}
        name={name}
        className={`${
          isDisabled && "cursor-not-allowed"
        } w-full px-4 bg-transparent placeholder:text-sm appearance-none 
          outline-none placeholder:text-gray-500
           text-white text-sm`}
        placeholder={placeholder}
      />
      <button
        disabled={isDisabled}
        className={`${isDisabled && "cursor-not-allowed"}`}
        type="button"
        onClick={handleClick}
      >
        <Image
          alt="Şifre göster/sakla"
          width={24}
          height={24}
          src={isVisible ? "/eyeClose.png" : "/eyeOpen.png"}
        />
      </button>
    </div>
  );
}
