import AccordionItem from "./AccordionItem";
import { v4 as uuidv4 } from "uuid";

export default function Accordion() {
  const items = [
    {
      heading: "Okul E-Posta'mı nasıl bulabilirim?",
      content: "Content1",
    },
    {
      heading: "E-Posta'mın şifresini nasıl sıfırlayabilirim?",
      content: "Content2",
    },
    {
      heading: "Neden kaydolmak için Okul E-Posta'sı istiyoruz?",
      content: "Content3",
    },
    {
      heading: "E-Posta'ma gelen kodu nereden bulabilirim?",
      content: "Content4",
    },
  ];

  return (
    <div className="w-full mb-24 mt-16">
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
