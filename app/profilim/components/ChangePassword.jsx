import { Icon } from "../../components/Input/Icon";

export function ChangePassword({ name, onClick }) {
  return (
    <button
      onClick={() => onClick(name)}
      className="w-full  hover:bg-primary-300 transition-all
   font-body border border-primary-100 p-3 rounded-md 
   flex  justify-center gap-3 items-center font-semibold"
    >
      <Icon name={"fa-solid fa-lock"} />
      Şifreni Güncelle
    </button>
  );
}
