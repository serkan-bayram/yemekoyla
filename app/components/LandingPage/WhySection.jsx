import HeroSecondHeading from "./HeroSecondHeading";
import ScrollTarget from "./ScrollTarget";
import WhyContent from "./WhyContent";

export default function WhySection() {
  return (
    <>
      <ScrollTarget id="why" />
      <HeroSecondHeading text="Neden?" />
      <WhyContent />
    </>
  );
}
