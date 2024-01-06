import { Comment } from "./Comment";
import { v4 as uuidv4 } from "uuid";

export function Comments() {
  const comments = [
    {
      author: "Anonim",
      comment: "Harika olmuş ellerinize sağlık!",
      positionX: "left-12",
      positionY: "top-16",
      fullStars: 4,
      emptyStars: 1,
    },

    {
      author: "İlhan",
      comment: "Makarna çok soğuktu geri kalanı idare eder.",
      positionX: "left-36",
      positionY: "bottom-4",
      fullStars: 3,
      emptyStars: 2,
    },

    {
      author: "Hilal",
      comment:
        "Ana yemek güzeldi çorbaysa hiç olmamış çok tuzluydu yemekhane de çok kalabalıktı.",
      positionX: "right-16",
      positionY: "top-16",
      fullStars: 2,
      emptyStars: 3,
    },

    {
      author: "Anonim",
      comment:
        "Tek kelimeyle bayıldım. Et tam kıvamındaydı pilav ve çorba da yanına çok iyi gitmiş, ekmekler bayattı bir puanı kırdım maalesef :)",
      positionX: "right-40",
      positionY: "bottom-4",
      fullStars: 5,
      emptyStars: 0,
    },
  ];

  return (
    <div className="hidden lg:block">
      {comments.map((comment) => (
        <div className={`absolute ${comment.positionX} ${comment.positionY}`}>
          <Comment
            key={uuidv4()}
            author={comment.author}
            comment={comment.comment}
            fullStars={comment.fullStars}
            emptyStars={comment.emptyStars}
          />
        </div>
      ))}
    </div>
  );
}
