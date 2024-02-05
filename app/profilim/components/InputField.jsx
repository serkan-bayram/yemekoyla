import Input from "../../components/Input/Input";

export function InputField({
  onClick,
  placeholder,
  label,
  iconName,
  isUpdatable,
  name,
}) {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="font-body">{label}</div>
      <div className="relative">
        <Input
          name={name}
          placeholder={placeholder}
          isDisabled={true}
          iconName={iconName}
        />
        {isUpdatable && (
          <button
            onClick={() => onClick(name)}
            className="absolute -right-3  translate-x-full
           top-1/2 -translate-y-1/2"
          >
            Güncelle
          </button>
        )}
      </div>
    </div>
  );
}
