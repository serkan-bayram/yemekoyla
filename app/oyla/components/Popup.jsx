"use client";

import { useState } from "react";
import CloseButton from "./CloseButton";
import { saveComment } from "../../components/Functions/saveComment";
import { error, success } from "../../components/Functions/notify";
import Loading from "../../components/LoadingButton";

function OpacityBackground({ setShowPopup }) {
  return (
    <div
      onClick={() => {
        setShowPopup(false);
      }}
      className="absolute top-0 left-0 w-full min-h-screen bg-black opacity-50"
    ></div>
  );
}

function Header({ text }) {
  return (
    <div className="text-lightAccent text-xl p-4 pb-0 font-bold font-heading text-center">
      {text}
    </div>
  );
}

function CommentSection({ setComment, isEditComment, rating }) {
  // Yorumunu düzenle yanında çöp kutusu olacak silmek için

  return (
    <div>
      <div className="font-body mt-8 mb-4">
        {isEditComment ? "Yorumunu Düzenle" : "Yorum yapmak ister misin?"}
      </div>
      <div>
        <textarea
          defaultValue={rating?.comment && rating?.comment}
          autoFocus={false}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          maxLength={"280"}
          name="comment"
          rows={6}
          placeholder="Yorumunuz..."
          className="resize-none w-full pr-4 pl-2 pt-2  border border-primary bg-transparent rounded-md
             placeholder:text-sm
              appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        ></textarea>
      </div>
    </div>
  );
}

function SaveButton({ isLoading, handleClick }) {
  return isLoading ? (
    <>
      <div className="mt-6"></div>
      <Loading />
    </>
  ) : (
    <button
      onClick={handleClick}
      type="button"
      className={`mt-6 rounded-md mx-auto bg-primary w-full h-full py-2  text-white border
border-gray-700 hover:bg-transparent transition-all duration-300
appearance-none focus:ring ring-secondary shadow-md`}
    >
      Kaydet
    </button>
  );
}

function Form({ setShowPopup, isEditComment, rating }) {
  const [comment, setComment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await saveComment(comment, rating.ratingId);

    if (response.ok) {
      success(response.message);
      setShowPopup(false);
      return;
    }

    error(response.message);
    setIsLoading(false);
  };

  return (
    <>
      <CommentSection
        isEditComment={isEditComment}
        rating={rating}
        setComment={setComment}
      />
      <SaveButton isLoading={isLoading} handleClick={handleClick} />
    </>
  );
}

export default function Popup({
  isEditComment,
  rating,
  showPopup,
  setShowPopup,
}) {
  return showPopup ? (
    <div className="fixed top-0 left-0 min-h-screen w-full flex justify-center items-center  z-50">
      <OpacityBackground setShowPopup={setShowPopup} />
      <div className="relative z-20 bg-secondary w-full mx-8 md:w-1/3 p-6 rounded-md border border-gray-700">
        <CloseButton setState={setShowPopup} />
        <Header text={isEditComment ? "Düzenle" : "Oylaman Kaydedildi!"} />
        <Form
          isEditComment={isEditComment}
          rating={rating}
          setShowPopup={setShowPopup}
        />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
