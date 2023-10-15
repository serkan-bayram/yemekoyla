import Button from "./Button";
import Header from "./Header";
import Inputs, { Input } from "./Inputs";

export default function SignInView() {
  return (
    <>
      <Header text="Giriş Yap" />
      <Inputs>
        <Input placeholder="Kullanıcı Adı" />
        <Input placeholder="Şifre" />
        <Button text="Giriş Yap" />
      </Inputs>
    </>
  );
}
