import Button from "./Button";
import Header from "./Header";
import Inputs, { Input } from "./Inputs";

export default function SignUpView() {
  return (
    <>
      <Header text="Kayıt Ol" />
      <Inputs>
        <Input placeholder="Okul Maili" />
        <Button text="Kayıt Ol" />
      </Inputs>
    </>
  );
}
