import Logo from "./Logo";
import NavbarClient from "./NavbarClient";
import { getSession } from "../getSession";

export default async function Navbar() {
  const { session, permission } = await getSession();

  // {
  //   pathname: ["/oyla"],
  //   links: [
  //     { href: "/", text: "Ana Sayfa" },
  //     { href: "/#why", text: "Neden?" },
  //     { href: "/#how", text: "Nasıl?" },
  //     { href: "/#contact", text: "İletişim" },
  //   ],
  // },

  let navigation;
  if (!session) {
    navigation = [
      {
        pathname: ["/"],
        links: [
          { selector: "#home", text: "Ana Sayfa" },
          { selector: "#why", text: "Neden?" },
          { selector: "#how", text: "Nasıl?" },
          { selector: "#contact", text: "İletişim" },
        ],
      },
      {
        pathname: ["/giris", "/kaydol", "/dogrula"],
        links: [],
      },
    ];
  }

  if (session) {
    navigation = [
      {
        pathname: ["/"],
        links: [
          { selector: "#home", text: "Ana Sayfa" },
          { selector: "#why", text: "Neden?" },
          { selector: "#how", text: "Nasıl?" },
          { selector: "#contact", text: "İletişim" },
          { href: "/api/auth/signout", text: "Çıkış Yap" },
        ],
      },
      {
        pathname: ["/giris", "/kaydol", "/dogrula"],
        links: [],
      },
      {
        pathname: ["/oyla"],

        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/api/auth/signout", text: "Çıkış Yap" },
        ],
      },
    ];
  }

  return (
    <div
      className="fixed top-0 z-50 flex items-center
     text-white justify-between px-12 w-full h-12 
     bg-secondary shadow border-b border-b-primary"
    >
      <Logo />
      <NavbarClient navigation={navigation} state={!!session} />
    </div>
  );
}
