"use client";

import Image from "next/image";

export function ShowPassword({ isVisible, isDisabled, setIsVisible }) {
  const handleClick = () => {
    setIsVisible((prevValue) => !prevValue);
  };

  return (
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
  );
}
