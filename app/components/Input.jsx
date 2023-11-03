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

export default function Input({ placeholder, name, isPassword, inputError }) {
  const errorState = inputError?.name === name;
  const errorMessage = inputError?.message;

  return (
    <>
      <div
        className={`w-full py-2 rounded-md 
    border ${
      errorState ? "animate-shake border-error mb-0" : "border-primary mb-6"
    }`}
      >
        {isPassword ? (
          <InputWithPassword
            errorState={errorState}
            placeholder={placeholder}
            name={name}
          />
        ) : (
          <input
            required
            name={name}
            className={`w-full px-4 bg-transparent placeholder:text-sm appearance-none 
        outline-none placeholder:text-gray-500 text-white text-sm`}
            placeholder={placeholder}
          />
        )}
      </div>
      {errorState && (
        <div className="mb-6 mt-1 text-error text-sm">{errorMessage}</div>
      )}
    </>
  );
}
