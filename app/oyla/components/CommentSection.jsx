"use client";

import { useState } from "react";
import Textarea from "./Textarea";
import { BigStars } from "./Stars";
import Gif from "./Gif/Gif";
import { saveRating } from "../../components/Functions/actions";
import { error, success } from "../../components/Functions/notify";
import { CloseButton } from "./Gif/CloseButton";
import { SelectedGif } from "./Gif/SelectedGif";
import { Icon } from "../../components/Input/Icon";

function Header({
  isEditing,
  setIsEditing,
  starRating,
  setStarRating,
  currentUser,
  isAnonim,
}) {
  return (
    <div className="flex justify-between w-full">
      <div className="font-body font-semibold">
        {isAnonim ? "Anonim" : currentUser}
      </div>
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2"
        >
          <span className="font-body">Düzenle</span>
          <Icon name={"fa-solid fa-pen-to-square"} />
        </button>
      ) : (
        <BigStars starRating={starRating} setStarRating={setStarRating} />
      )}
    </div>
  );
}

function Anonim({ isAnonim, setIsAnonim }) {
  return (
    <button
      type="button"
      onClick={() => setIsAnonim((prevValue) => !prevValue)}
      className="flex gap-6 bg-primary-400 py-2 px-4 rounded-full
     border relative border-primary-100"
    >
      <div
        className={`rounded-full transition-all ease-in-out
          absolute w-1/2 h-full bg-accent-400  
      top-0 left-0 
      ${
        isAnonim
          ? "translate-x-full rounded-l-none"
          : "translate-x-0 rounded-r-none"
      }`}
      ></div>
      <div className="relative">
        <Icon name="fa-solid fa-user" />
      </div>
      <div className="relative">
        <Icon name="fa-solid fa-user-secret" />
      </div>
    </button>
  );
}

function Footer({
  isAnonim,
  setIsAnonim,
  isLoading,
  selectedGif,
  setSelectedGif,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mt-2">
        <Gif selectedGif={selectedGif} setSelectedGif={setSelectedGif} />
        <div className="flex gap-6 items-center">
          <Anonim isAnonim={isAnonim} setIsAnonim={setIsAnonim} />
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
  const didUserRated = rating.rating;

  const [selectedGif, setSelectedGif] = useState(rating.gif);
  const [comment, setComment] = useState(rating.comment);
  const [starRating, setStarRating] = useState(parseFloat(rating.rating));
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(!didUserRated);
  const [isAnonim, setIsAnonim] = useState(rating.isAnonim || false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const response = await saveRating(
      isAnonim,
      selectedGif,
      comment,
      starRating
    );

    if (!response.message) {
      if (response?.notRated) {
        error("Herhangi bir değerlendirme yapmadınız.");
      } else {
        error("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
      }
    } else {
      if (response?.isAlreadySaved) {
        success("Değerlendirmeniz güncellendi!");
      } else {
        success("Değerlendirmeniz kaydedildi!");
      }
      setIsEditing(false);
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
          isAnonim={isAnonim}
          starRating={starRating}
          setStarRating={setStarRating}
          currentUser={currentUser}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        {isEditing && (
          <form onSubmit={handleSubmit}>
            <Textarea comment={comment} setComment={setComment} />
            <Footer
              isAnonim={isAnonim}
              setIsAnonim={setIsAnonim}
              isLoading={isLoading}
              selectedGif={selectedGif}
              setSelectedGif={setSelectedGif}
            />
          </form>
        )}
      </div>
    </li>
  );
}
