import { getSession } from "../Functions/getSession";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const { session } = await getSession();

  let navigation;

  // User is not authenticated
  if (!session) {
    navigation = [
      {
        pathname: ["/", "/telegram"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/giris", text: "Giriş Yap" },
          { href: "/kaydol", text: "Kaydol" },
          { href: "/telegram", text: "Telegram" },
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
        pathname: ["/", "/telegram"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/profilim", text: "Profilim" },
          { href: "/telegram", text: "Telegram" },
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
          { href: "/profilim", text: "Profilim" },
          { href: "/telegram", text: "Telegram" },
        ],
      },
      {
        pathname: ["/profilim"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/profilim", text: "Profilim" },
          { href: "/telegram", text: "Telegram" },
        ],
      },
    ];
  }

  return <NavbarClient navigation={navigation} />;
}
