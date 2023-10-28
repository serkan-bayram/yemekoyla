import Link from "next/link";
import UnderlinedText from "../UnderlinedText";

export default function SignInButton() {
  return (
    <div className="text-gray-600 mt-7 font-body">
      Zaten kayıtlı mısın?{" "}
      <Link href="/giris" className="text-gray-400 font-semibold">
        <UnderlinedText text="Giriş Yap." />
      </Link>
    </div>
  );
}
