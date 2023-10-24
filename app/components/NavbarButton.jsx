import Link from "next/link";

function SignInButton({ closeMenu }) {
  return (
    <Link
      onClick={closeMenu}
      href="/giris"
      className="text-center rounded-sm bg-accent 
     px-2 py-1  hover:bg-transparent transition-all duration-300 font-body  w-full border border-white  font-semibold text-white"
    >
      Giriş Yap
    </Link>
  );
}

function RateButton({ closeMenu }) {
  return (
    <Link
      onClick={closeMenu}
      href="/oyla"
      className="text-center rounded-sm bg-accent 
         px-2 py-1  hover:bg-transparent transition-all duration-300 font-body  w-full border border-white  font-semibold text-white"
    >
      Oyla
    </Link>
  );
}

export default function NavbarButton({ state, closeMenu }) {
  if (!state) {
    return <SignInButton closeMenu={closeMenu} />;
  }

  if (state) {
    return <RateButton closeMenu={closeMenu} />;
  }

  return <span></span>;
}
