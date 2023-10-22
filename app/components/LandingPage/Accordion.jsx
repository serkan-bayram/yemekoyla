import AccordionItem from "./AccordionItem";
import { v4 as uuidv4 } from "uuid";

export default function Accordion() {
  const items = [
    {
      heading: "Okul E-posta'mı nasıl bulabilirim?",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum omnis molestias, ut quia voluptates exercitationem odio optio fuga qui fugit?",
    },
    {
      heading: "E-Posta'mın şifresini nasıl sıfırlayabilirim?",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum omnis molestias, ut quia voluptates exercitationem odio optio fuga qui fugit?",
    },
  ];

  return (
    <div className="w-full px-12 mb-24 mt-16">
      {items.map((item) => {
        return (
          <AccordionItem
            key={uuidv4()}
            heading={item.heading}
            content={item.content}
          />
        );
      })}
    </div>
  );
}
