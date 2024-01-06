import { getSession } from "../Functions/getSession";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const { session } = await getSession();

  let navigation;

  // User is not authenticated
  if (!session) {
    navigation = [
      {
        pathname: ["/"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/giris", text: "Giriş Yap" },
          { href: "/kaydol", text: "Kaydol" },
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
          { href: "/", text: "Ana Sayfa" },
          { href: "/profilim", text: "Profilim" },
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
          { href: "/profilim", text: "Profilim" },
          { href: "/api/auth/signout", text: "Çıkış Yap" },
        ],
      },
      {
        pathname: ["/profilim"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/profilim", text: "Profilim" },
          { href: "/api/auth/signout", text: "Çıkış Yap" },
        ],
      },
    ];
  }

  return <NavbarClient navigation={navigation} />;
}
