import { Icon } from "../../components/Input/Icon";
import Button from "./Button";
import { ChangePassword } from "./ChangePassword";
import { InputField } from "./InputField";

export default function Settings({
  setDashboard,
  setPopup,
  username,
  userEmail,
}) {
  const handleClick = (popup) => {
    setPopup(popup);
  };

  return (
    <div
      className="flex flex-col gap-5 
     absolute lg:static lg:h-auto lg:w-auto 
     lg:pt-0 lg:px-0 top-0 pt-36 px-6 left-0
      bg-primary-400 h-screen w-screen "
    >
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
      <button
        className="lg:hidden absolute top-24 left-6 flex gap-2 items-center"
        onClick={() => setDashboard(false)}
      >
        <Icon name="fa-solid fa-angle-left" /> Geri Dön
      </button>
    </div>
  );
}
