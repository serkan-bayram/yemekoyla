import Logo from "./Logo";
import NavbarClient from "./NavbarClient";
import { getSession } from "../getSession";

export default async function Navbar() {
  const { session, permission } = await getSession();

  let items;
  if (!session) {
    items = [
      { selector: "#home", text: "Ana Sayfa", pathname: "/" },
      { selector: "#why", text: "Neden?", pathname: "/" },
      { selector: "#how", text: "Nasıl?", pathname: "/" },
      { href: "/oyla", text: "Oyla", pathname: "/" },
      { selector: "#contact", text: "İletişim", pathname: "/" },
      { href: "/", text: "Ana Sayfa", pathname: "/oyla" },
      { href: "/#why", text: "Neden?", pathname: "/oyla" },
      { href: "/#how", text: "Nasıl?", pathname: "/oyla" },
      { href: "/oyla", text: "Oyla", pathname: "/oyla" },
      { href: "/#contact", text: "İletişim", pathname: "/oyla" },
      { href: "/", text: "Ana Sayfa", pathname: "/giris" },
      { href: "/", text: "Ana Sayfa", pathname: "/kaydol" },
      { href: "/", text: "Ana Sayfa", pathname: "/dogrula" },
    ];
  }

  // can be improved
  if (session) {
    items = [
      { selector: "#home", text: "Ana Sayfa", pathname: "/" },
      { selector: "#why", text: "Neden?", pathname: "/" },
      { selector: "#how", text: "Nasıl?", pathname: "/" },
      { href: "/oyla", text: "Oyla", pathname: "/" },
      { selector: "#contact", text: "İletişim", pathname: "/" },
      { href: "/", text: "Ana Sayfa", pathname: "/oyla" },
      { href: "/#why", text: "Neden?", pathname: "/oyla" },
      { href: "/#how", text: "Nasıl?", pathname: "/oyla" },
      { href: "/oyla", text: "Oyla", pathname: "/oyla" },
      { href: "/#contact", text: "İletişim", pathname: "/oyla" },
      { href: "/", text: "Ana Sayfa", pathname: "/giris" },
      { href: "/", text: "Ana Sayfa", pathname: "/kaydol" },
      { href: "/", text: "Ana Sayfa", pathname: "/dogrula" },
      { href: "/api/auth/signout", text: "Çıkış Yap", pathname: "/" },
      { href: "/api/auth/signout", text: "Çıkış Yap", pathname: "/oyla" },
    ];
  }

  return (
    <div
      className="fixed top-0 z-50 flex items-center
     text-white justify-between px-12 w-full h-12 
     bg-secondary shadow border-b border-b-primary"
    >
      <Logo />
      <NavbarClient items={items} />
    </div>
  );
}
