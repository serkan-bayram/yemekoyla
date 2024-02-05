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
      <div className="flex justify-between items-center">
        <div className="font-body">{label}</div>
        {isUpdatable && (
          <button onClick={() => onClick(name)} className="">
            Güncelle
          </button>
        )}
      </div>
      <div className="relative">
        <Input
          name={name}
          placeholder={placeholder}
          isDisabled={true}
          iconName={iconName}
        />
      </div>
    </div>
  );
}
