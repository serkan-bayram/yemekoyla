import HeroSection from "./components/LandingPage/HeroSection";
import WhySection from "./components/LandingPage/WhySection";
import HowSection from "./components/LandingPage/HowSection";
import ContactSection from "./components/LandingPage/ContactSection";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";

function Padding({ children }) {
  return <div className="px-12">{children}</div>;
}

export default function Page() {
  return (
    <>
      <Navbar />
      <Padding>
        <HeroSection />
        <WhySection />
        <HowSection />
        <ContactSection />
      </Padding>
      <Footer />
    </>
  );
}
