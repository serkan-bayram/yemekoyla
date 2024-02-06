"use client";

import { useState } from "react";
import { Icon } from "../../components/Input/Icon";
import Button from "./Button";
import { deleteRating } from "../../components/Functions/actions";
import { error, success } from "../../components/Functions/notify";

export function CommentDetails({ comment, setPopup }) {
  const [isLoading, setIsLoading] = useState(false);

  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const publishedDate = new Date(comment.updated).toLocaleString(
    "tr-TR",
    options
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await deleteRating(comment);

    if (response?.error === "cantDeleteRating") {
      error("Yorumunuz silinemedi, lütfen daha sonra tekrar deneyiniz.");
      setIsLoading(false);
      return;
    }

    success("Yorumunuz silindi!");
    setIsLoading(false);
  };

  return (
    <div
      className="bg-black lg:px-24 px-16
  py-12 border border-primary-400 rounded-md z-50 relative"
    >
      <button
        className="absolute top-3 left-3
         flex gap-2 items-center "
        onClick={() => setPopup(false)}
      >
        <Icon name="fa-solid fa-angle-left" /> Geri Dön
      </button>
      <div className="mt-4 flex flex-col gap-5 items-center">
        <div>
          <div className="font-body font-semibold text-center">
            Paylaşılan Tarih
          </div>
          <div className="text-center">{publishedDate}</div>
        </div>
        <Button text="Yemeğe Git" />

        <div>
          <form onSubmit={handleSubmit}>
            <Button
              isLoading={isLoading}
              type="submit"
              variant={"danger"}
              text="Yorumu Sil"
            />
          </form>
          <div className="text-error font-body mt-2">
            Bu işlem geri alınamaz!
          </div>
        </div>
      </div>
    </div>
  );
}
