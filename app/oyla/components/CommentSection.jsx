"use client";

import { useState } from "react";
import Textarea from "./Textarea";
import { BigStars } from "./Stars";
import Gif from "./Gif/Gif";
import { saveRating } from "./saveRating";
import { error, success } from "../../components/Functions/notify";
import { CloseButton } from "./Gif/CloseButton";
import { SelectedGif } from "./Gif/SelectedGif";

function Header({ starRating, setStarRating, currentUser }) {
  return (
    <div className="flex justify-between w-full">
      <div className="font-body font-semibold">{currentUser}</div>
      <BigStars starRating={starRating} setStarRating={setStarRating} />
    </div>
  );
}

function Footer({ isLoading, selectedGif, setSelectedGif }) {
  return (
    <div>
      <div className="flex justify-between items-center mt-2">
        <Gif selectedGif={selectedGif} setSelectedGif={setSelectedGif} />
        <button
          type={isLoading ? "button" : "submit"}
          className={`bg-white py-2 px-4 rounded-lg
     transition-all hover:text-accent-400 
     text-sm text-black font-semibold font-body
     ${isLoading && "opacity-50 cursor-default hover:text-black"}`}
        >
          Paylaş
        </button>
      </div>
      {selectedGif.length > 0 && (
        <div className="mt-6 w-fit">
          <div className="flex mb-1 justify-between items-center">
            <div className="font-body ">Seçilen Gif</div>
            <CloseButton setState={setSelectedGif} />
          </div>
          <SelectedGif selectedGif={selectedGif} />
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ rating, currentUser }) {
  const [selectedGif, setSelectedGif] = useState(rating.gif);
  const [comment, setComment] = useState(rating.comment);
  const [starRating, setStarRating] = useState(parseFloat(rating.rating));
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await saveRating(selectedGif, comment, starRating);

    if (!response.message) {
      if (response?.notRated) {
        error("0 yıldız veremezsiniz.");
      } else {
        error("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
      }
    } else {
      if (response?.isAlreadySaved) {
        success("Değerlendirmeniz güncellendi!");
      } else {
        success("Değerlendirmeniz kaydedildi!");
      }
    }

    setIsLoading(false);
  };

  return (
    <li
      className="border-l-0 border-r-0 border border-primary-100
    first:border-t-0 last:border-b-0 p-1"
    >
      <div className="w-full bg-primary-400 p-2">
        <Header
          starRating={starRating}
          setStarRating={setStarRating}
          currentUser={currentUser}
        />
        <form onSubmit={handleSubmit}>
          <Textarea comment={comment} setComment={setComment} />
          <Footer
            isLoading={isLoading}
            selectedGif={selectedGif}
            setSelectedGif={setSelectedGif}
          />
        </form>
      </div>
    </li>
  );
}
