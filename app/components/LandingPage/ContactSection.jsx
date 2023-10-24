import HeroSecondHeading from "./HeroSecondHeading";
import ContactForm from "./ContactForm";
import ScrollTarget from "./ScrollTarget";

export default function ContactSection() {
  return (
    <>
      <HeroSecondHeading text="İletişim" />
      <ScrollTarget id="contact" />
      <ContactForm />
    </>
  );
}
