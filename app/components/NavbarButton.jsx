import Link from "next/link";

function SignInButton() {
  return (
    <Link
      href="/giris"
      className="text-center rounded-md bg-accent 
     px-2 py-1  hover:bg-transparent transition-all duration-300 font-body  w-full border border-white  font-semibold text-white"
    >
      Giriş Yap
    </Link>
  );
}

function RateButton() {
  return (
    <Link
      href="/oyla"
      className="text-center rounded-md bg-accent 
         px-2 py-1  hover:bg-transparent transition-all duration-300 font-body  w-full border border-white  font-semibold text-white"
    >
      Oyla
    </Link>
  );
}

export default function NavbarButton({ state }) {
  if (!state) {
    return <SignInButton />;
  }

  if (state) {
    return <RateButton />;
  }

  return <span></span>;
}
