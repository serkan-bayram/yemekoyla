import Accordion from "./Accordion";

export default function FAQ() {
  return (
    <div className="flex flex-col items-center pt-32 pb-8">
      <h4 className="lg:text-5xl text-4xl font-semibold mb-12 font-heading">
        Bir sorun mu var?
      </h4>
      <div className="lg:mx-24 mx-4">
        <Accordion />
      </div>
    </div>
  );
}
