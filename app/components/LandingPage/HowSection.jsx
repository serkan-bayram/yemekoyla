import HeroSecondHeading from "./HeroSecondHeading";
import Accordion from "./Accordion";
import ScrollTarget from "./ScrollTarget";

export default function HowSection() {
  return (
    <>
      <ScrollTarget id="how" />
      <HeroSecondHeading text="Nasıl?" />
      <Accordion />
    </>
  );
}
