import { sendVerifyCode } from "./sendVerifyCode";
import Input from "./Input";
import Button from "./Button";

export default function SignUpForm() {
  return (
    <form action={sendVerifyCode} className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="Okul Maili" name="email" />
      <Button text="Kaydol" />
    </form>
  );
}
