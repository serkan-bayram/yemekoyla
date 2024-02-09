"use client";

import { useState } from "react";
import AccordionContent from "./AccordionContent";
import AccordionHeading from "./AccordionHeading";

export default function AccordionItem({ heading, content }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <div className="w-full border even:border-b-0   border-primary-100">
      <div className="w-full bg-primary-400  p-4 rounded-sm">
        <AccordionHeading
          isOpen={isOpen}
          handleClick={handleClick}
          heading={heading}
        />
        <AccordionContent isOpen={isOpen} content={content} />
      </div>
    </div>
  );
}
