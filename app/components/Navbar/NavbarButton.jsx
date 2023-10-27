import Link from "next/link";

function Button({ closeMenu, href, text }) {
  return (
    <Link
      onClick={closeMenu}
      href={href}
      className="text-center rounded-md bg-accent 
     px-5 py-1  hover:bg-transparent transition-all duration-300 font-body  w-full border border-white  font-semibold text-white"
    >
      {text}
    </Link>
  );
}

// If state is true, that means the user is authenticated
export default function NavbarButton({ state, closeMenu }) {
  return state ? (
    <Button closeMenu={closeMenu} href="/oyla" text="Oyla" />
  ) : (
    <Button closeMenu={closeMenu} href="/giris" text="Giriş Yap" />
  );
}
