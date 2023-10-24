import HeroSection from "./components/LandingPage/HeroSection";
import WhySection from "./components/LandingPage/WhySection";
import HowSection from "./components/LandingPage/HowSection";
import ContactSection from "./components/LandingPage/ContactSection";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <HeroSection />
      <WhySection />
      <HowSection />
      <ContactSection />
      <Footer />
    </>
  );
}
