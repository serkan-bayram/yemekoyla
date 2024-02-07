import React from "react";
import { Icon } from "../../components/Input/Icon";

export default function Button({
  isLoading,
  type,
  iconName,
  text,
  onClick,
  variant,
  textCenter,
}) {
  const defaultVariant =
    "lg:bg-primary-transparent border border-primary-200 hover:bg-primary-300 text-fade-300";

  const dangerVariant = "bg-error text-white";

  let appliedStyles;
  if (!!variant === false) {
    appliedStyles = defaultVariant;
  } else if (variant === "danger") {
    appliedStyles = dangerVariant;
  }

  return (
    <button
      type={!!isLoading ? "button" : type ? type : "button"}
      onClick={onClick || null}
      className={`${appliedStyles} w-full  py-2 px-4 text-start 
              rounded-md  
              font-body 
              transition-all
              
             flex items-center justify-center 
            ${textCenter ? "lg:justify-center" : "lg:justify-normal"}
             ${isLoading && "opacity-50"}
             `}
    >
      {iconName && (
        <div className="mr-2">
          <Icon name={iconName} />
        </div>
      )}
      {text}
    </button>
  );
}
