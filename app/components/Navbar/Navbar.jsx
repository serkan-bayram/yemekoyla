import Logo from "../LandingPage/Logo";
import NavbarClient from "./NavbarClient";
import { getSession } from "../Functions/getSession";

// If onlyLogo is true navbar only renders Logo and not items
export default async function Navbar({ onlyLogo = false }) {
  const { session } = await getSession();

  let navigation;

  // User is not authenticated
  if (!session) {
    navigation = [
      {
        pathname: ["/"],
        links: [
          { selector: "#home", text: "Ana Sayfa" },
          { selector: "#why", text: "Neden?" },
          { selector: "#how", text: "S.S.S" },
          { selector: "#contact", text: "İletişim" },
        ],
      },
      {
        pathname: ["/giris", "/kaydol", "/dogrula"],
        links: [],
      },
    ];
  }

  // User is authenticated
  if (session) {
    navigation = [
      {
        pathname: ["/"],
        links: [
          { selector: "#home", text: "Ana Sayfa" },
          { selector: "#why", text: "Neden?" },
          { selector: "#how", text: "S.S.S" },
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
      {!onlyLogo && <NavbarClient navigation={navigation} state={!!session} />}
    </div>
  );
}