import Link from "next/link";

export default function SignInButton() {
  return (
    <div className="text-gray-600 mt-7 font-body">
      Zaten kayıtlı mısın?{" "}
      <Link
        href="/giris"
        className="text-gray-400 ml-1 font-semibold relative
  after:transition-all after:duration-300
  after:h-1 after:bg-accent after:absolute after:left-0 after:-bottom-1
  after:scale-y-50 underlined-link
  "
      >
        Giriş Yap.
      </Link>
    </div>
  );
}
