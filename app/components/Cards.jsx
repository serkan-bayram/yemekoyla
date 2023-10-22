import { v4 as uuidv4 } from "uuid";

export default function Cards() {
  const content = [
    {
      heading: "İletim ve Geri Bildirim",
      message:
        "Kimsenin umursamadığı şikayet kutuları yerine doğrulanmış öğrenciler tarafından yapılan değerlendirmeleri hızlı ve etkili bir şekilde yönetiyoruz.",
    },
    {
      heading: "Ne kadar kalabalık, o kadar çabuk",
      message:
        "Her geçen yıl daha kötüye giden yemekhane yemeklerini değiştirmek için bu yolda hep beraber ilerliyoruz, ne kadar fazla farklı sesimiz olursa o kadar çabuk bir etki görebiliriz.",
    },
  ];

  return (
    <>
      {content.map((card) => {
        return (
          <Card key={uuidv4()} heading={card.heading} message={card.message} />
        );
      })}
    </>
  );
}

export function Card({ heading, message }) {
  return (
    <div className="card-container border border-primary shadow flex flex-col items-center bg-secondary p-4 rounded-md">
      <div
        className="font-heading text-xl z-20 font-semibold mb-4 text-white relative 
    after:w-full after:h-1 after:-z-10 after:bg-accent after:absolute after:left-0 after:bottom-0
    after:transition-all
  card-heading
    "
      >
        {heading}
      </div>
      <div className="text-white tracking-wide leading-relaxed font-body">
        {message}
      </div>
    </div>
  );
}
