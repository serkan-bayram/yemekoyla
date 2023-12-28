import HeroSection from "./components/LandingPage/HeroSection";
import WhySection from "./components/LandingPage/WhySection";
import HowSection from "./components/LandingPage/HowSection";
import ContactSection from "./components/LandingPage/ContactSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import { headers } from "next/headers";
import { NotificationsGuest } from "./oyla/components/Notifications";
import Link from "next/link";

function Padding({ children }) {
  return <div className="px-12">{children}</div>;
}

export default async function Page() {
  const headersList = headers();
  const isGuest = headersList.get("is-guest");

  const notifications = [
    {
      title: (
        <div className="font-heading text-md">
          Görünüşe göre <b>Eduroam</b> ile bağlanıyorsunuz.
        </div>
      ),
      content: (
        <p className="font-body mt-1 text-sm">
          Kaydolmadan devam etmek için{" "}
          <Link
            className="font-semibold text-accent font-body cursor-pointer"
            href={"/oyla"}
          >
            buraya tıklayın.
          </Link>
        </p>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      {isGuest && <NotificationsGuest notifications={notifications} />}
      <HeroSection />
      <Padding>
        <WhySection />
        <HowSection />
        <ContactSection />
      </Padding>
      <Footer />
    </>
  );
}
