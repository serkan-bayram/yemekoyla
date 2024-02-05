import { ChangePassword } from "./ChangePassword";
import { InputField } from "./InputField";

export default function Settings({ setPopup, username, userEmail }) {
  const handleClick = (popup) => {
    setPopup(popup);
  };

  return (
    <div className="flex flex-col gap-5">
      <InputField
        name="username"
        onClick={handleClick}
        isUpdatable={true}
        placeholder={username}
        label="Kullanıcı Adı"
        iconName="fa-solid fa-user"
      />
      <InputField
        name="email"
        placeholder={userEmail}
        label="E-Posta"
        iconName="fa-solid fa-envelope"
      />
      <div className="mt-2">
        <ChangePassword name="password" onClick={handleClick} />
      </div>
    </div>
  );
}
