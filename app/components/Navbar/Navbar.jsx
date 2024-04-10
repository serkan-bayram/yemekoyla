import { headers } from "next/headers";
import { getSession } from "../Functions/getSession";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const { session, permission } = await getSession();

  const headersList = headers();

  const isGuest = headersList.get("is-guest");

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
        pathname: ["/", "/telegram", "/tarihce", "/bakiyem"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/profilim", text: "Profilim" },
          { href: "/telegram", text: "Telegram" },
          { href: "/tarihce", text: "Tarihçe" },
          { href: "/bakiyem", text: "Akıllı Bakiye" },
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
          { href: "/tarihce", text: "Tarihçe" },
          { href: "/bakiyem", text: "Akıllı Bakiye" },
        ],
      },
      {
        pathname: ["/profilim"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/profilim", text: "Profilim" },
          { href: "/telegram", text: "Telegram" },
          { href: "/tarihce", text: "Tarihçe" },
          { href: "/bakiyem", text: "Akıllı Bakiye" },
        ],
      },
    ];

    // if (permission === "vip") {
    //   navigation = [
    //     {
    //       pathname: ["/", "/telegram", "/tarihce", "/bakiyem"],
    //       links: [
    //         { href: "/", text: "Ana Sayfa" },
    //         { href: "/profilim", text: "Profilim" },
    //         { href: "/telegram", text: "Telegram" },
    //         { href: "/tarihce", text: "Tarihçe" },
    //         { href: "/bakiyem", text: "Bakiyem" },
    //       ],
    //     },
    //     {
    //       pathname: ["/giris", "/kaydol", "/dogrula"],
    //       links: [],
    //     },
    //     {
    //       pathname: ["/oyla"],
    //       links: [
    //         { href: "/", text: "Ana Sayfa" },
    //         { href: "/profilim", text: "Profilim" },
    //         { href: "/telegram", text: "Telegram" },
    //         { href: "/tarihce", text: "Tarihçe" },
    //         { href: "/bakiyem", text: "Bakiyem" },
    //       ],
    //     },
    //     {
    //       pathname: ["/profilim"],
    //       links: [
    //         { href: "/", text: "Ana Sayfa" },
    //         { href: "/profilim", text: "Profilim" },
    //         { href: "/telegram", text: "Telegram" },
    //         { href: "/tarihce", text: "Tarihçe" },
    //         { href: "/bakiyem", text: "Bakiyem" },
    //       ],
    //     },
    //   ];
    // }
  }

  if (isGuest) {
    navigation = [
      {
        pathname: ["/", "/telegram", "/oyla", "/tarihce"],
        links: [
          { href: "/", text: "Ana Sayfa" },
          { href: "/giris", text: "Giriş Yap" },
          { href: "/kaydol", text: "Kaydol" },
          { href: "/telegram", text: "Telegram" },
          { href: "/tarihce", text: "Tarihçe" },
        ],
      },
      {
        pathname: ["/giris", "/kaydol", "/dogrula"],
        links: [],
      },
    ];
  }

  return <NavbarClient navigation={navigation} />;
}
