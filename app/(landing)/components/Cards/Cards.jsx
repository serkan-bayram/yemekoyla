import { v4 as uuidv4 } from "uuid";
import { Card } from "./Card";

export default function Cards() {
  const cards = [
    {
      title: "Kaydol",
      content: "Okul E-Posta’nı kullanarak öğrenci olduğunu doğrula.",
      imageSrc: "/mail.svg",
      imageAlt: "E-Posta",
      timeout: 0,
    },
    {
      title: "Yorumunu Yap",
      content:
        "Yemek veya yemekhane ile alakalı herhangi bir şey hakkında düşüncelerini yaz.",
      imageSrc: "/comment.svg",
      imageAlt: "Yorum",
      timeout: 200,
    },
    {
      title: "Tekrarla",
      content: "İşte bir şeyleri değiştirmek bu kadar basit. 🎉",
      imageSrc: "/check.png",
      imageAlt: "Tik",
      timeout: 400,
    },
  ];

  return (
    <div
      id="how"
      className="flex flex-col lg:flex-row justify-center gap-32 lg:py-32 py-20"
    >
      {cards.map((card) => (
        <Card key={uuidv4()} {...card} />
      ))}
    </div>
  );
}
