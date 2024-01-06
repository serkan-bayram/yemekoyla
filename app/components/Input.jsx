import Image from "next/image";
import InputWithPassword from "./InputWithPassword";

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
  isPassword,
  inputError,
  imgSrc,
  imgAlt,
}) {
  const errorState = inputError && inputError?.name === name;
  const errorMessage = inputError && inputError?.message;

  return (
    <>
      <div
        className={`w-full py-3 rounded-md 
    border ${
      errorState ? "animate-shake border-error mb-0" : "border-primary "
    }`}
      >
        {isPassword ? (
          <InputWithPassword
            imgSrc={imgSrc}
            imgAlt={imgAlt}
            isDisabled={isDisabled}
            errorState={errorState}
            placeholder={placeholder}
            name={name}
          />
        ) : (
          <div className="flex pl-3 gap-4 ">
            {imgSrc && (
              <Image src={imgSrc} alt={imgAlt} width={24} height={24} />
            )}
            <input
              disabled={isDisabled}
              required
              name={name}
              className={`${
                isDisabled && "cursor-not-allowed"
              } w-full  bg-transparent  appearance-none 
                    outline-none placeholder:text-gray-500 text-white font-body `}
              placeholder={placeholder}
            />
          </div>
        )}
      </div>
      {errorState && (
        <div className=" mt-1 text-error text-sm">{errorMessage}</div>
      )}
    </>
  );
}
