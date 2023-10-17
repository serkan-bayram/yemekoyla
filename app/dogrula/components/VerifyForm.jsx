import { verifyCode } from "./verifyCode";
import Input from "./Input";
import Button from "./Button";

export default function VerifyForm() {
  return (
    <form action={verifyCode} className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="Kod" name="code" />
      <Button text="Doğrula" />
    </form>
  );
}
