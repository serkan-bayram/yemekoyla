import { useState } from "react";
import { Error } from "./Error";
import { Icon } from "./Icon";
import { ShowPassword } from "./ShowPassword";

export function Textarea({ placeholder, name }) {
  return (
    <div className="w-full py-2 rounded-md border border-primary">
      <textarea
        required
        name={name}
        rows={12}
        className="resize-none w-full px-4  bg-transparent placeholder:text-sm appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        placeholder={placeholder}
      />
    </div>
  );
}

export default function Input({
  isDisabled,
  placeholder,
  name,
  inputError,
  iconName,
  isPassword,
}) {
  const errorState = inputError && inputError?.name === name;
  const errorMessage = inputError && inputError?.message;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div
        className={`w-full py-3 rounded-md border 
        ${
          errorState ? "animate-shake border-error mb-0" : "border-primary-100"
        }`}
      >
        <div className="flex items-center px-4 gap-4 w-full">
          <Icon name={iconName} />
          <div className="flex flex-1">
            <input
              disabled={isDisabled}
              required
              type={isPassword ? (isVisible ? "text" : "password") : "text"}
              name={name}
              className={`
              ${isDisabled && "cursor-default"} 
              w-full bg-transparent  appearance-none 
              outline-none placeholder:text-gray-500 font-body
              placeholder:text-sm text-sm  
              lg:placeholder:text-base lg:text-base
            text-white `}
              placeholder={placeholder}
            />
            {isPassword && (
              <ShowPassword
                setIsVisible={setIsVisible}
                isVisible={isVisible}
                isDisabled={isDisabled}
              />
            )}
          </div>
        </div>
      </div>
      <Error errorState={errorState} errorMessage={errorMessage} />
    </>
  );
}
