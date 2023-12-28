import HeroSection from "./components/LandingPage/HeroSection";
import WhySection from "./components/LandingPage/WhySection";
import HowSection from "./components/LandingPage/HowSection";
import ContactSection from "./components/LandingPage/ContactSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import { headers } from "next/headers";
import { NotificationsGuest } from "./oyla/components/Notifications";

function Padding({ children }) {
  return <div className="px-12">{children}</div>;
}

export default async function Page() {
  const headersList = headers();
  const isGuest = headersList.get("is-guest");

  return (
    <>
      <Navbar />
      {isGuest && <NotificationsGuest />}
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
