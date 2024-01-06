import Navbar from "../components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import Communication from "./components/Communication/Communication";
import Values from "./components/Values/Values";
import Trip from "./components/Trip/Trip";
import Cards from "./components/Cards/Cards";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

export default async function Page() {
  // main 64 px is header height
  return (
    <div>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] pt-16 lg:pt-0">
        <div className="bg-gradient-to-b from-primary-300 to-primary-400">
          <HeroSection />
          <Communication />
        </div>
        <div className="bg-gradient-to-b  from-primary-400 to-primary-200 to-30%">
          <Values />
        </div>
        <div className="bg-gradient-to-b from-primary-200 from-10% to-primary-400">
          <Trip />
          <Cards />
          <FAQ />
          <Footer />
        </div>
      </main>
    </div>
  );
}
