import Input from "./Input";
import Button from "./Button";

export default function CreateProfileForm() {
  return (
    <form className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="Kullanıcı Adı" name="username" />
      <Input placeholder="Şifre" name="password" />
      <Button text="Onayla" />
    </form>
  );
}
