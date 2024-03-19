import Image from "next/image";

export default function AccordionHeading({ heading, handleClick, isOpen, id }) {
  return (
    <button
      onClick={handleClick}
      className={`w-full flex justify-between items-center ${
        isOpen ? "mb-3" : ""
      }`}
    >
      <h4 className="h-full lg:text-left text-center tracking-normal  text-white  font-heading text-xl ">
        {heading}
      </h4>
      <Image src="/downArrow.png" width={24} height={24} alt="Aşağı ok." />
    </button>
  );
}
