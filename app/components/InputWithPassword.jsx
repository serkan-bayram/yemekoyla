"use client";

import Image from "next/image";
import { useState } from "react";

export default function InputWithPassword({ placeholder, name, errorState }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  return (
    <div className="flex pr-4">
      <input
        required
        type={isVisible ? "text" : "password"}
        name={name}
        className="w-full px-4 bg-transparent placeholder:text-sm appearance-none 
          outline-none placeholder:text-gray-500 text-white text-sm"
        placeholder={placeholder}
      />
      <button type="button" onClick={handleClick}>
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
