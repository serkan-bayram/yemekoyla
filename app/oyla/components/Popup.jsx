"use client";

import { useEffect, useRef, useState } from "react";
import CloseButton from "./CloseButton";
import { saveComment } from "../../components/Functions/saveComment";
import { error, success } from "../../components/Functions/notify";
import Loading from "../../components/LoadingButton";
import Gif from "./Gif/Gif";

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
    <div className="text-accent-300 text-xl p-4 pb-0 font-bold font-heading text-center">
      {text}
    </div>
  );
}

// TODO prevent or delete multiple \n
function CommentSection({ comment, setComment, isEditComment, rating }) {
  // Yorumunu düzenle yanında çöp kutusu olacak silmek için

  const ref = useRef(0);

  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    // Calculate divWidth after the component has mounted
    if (ref.current) {
      setDivWidth(ref.current.offsetWidth);
    }
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const progressbarCalculation = divWidth / 280;

  const commentLength = comment.length;

  const progressbarWidth = (commentLength * progressbarCalculation).toFixed(0);

  return (
    <div>
      <div className="font-body mt-8 mb-4">
        {isEditComment ? "Yorumunu Düzenle" : "Yorum yapmak ister misin?"}
      </div>
      <div ref={ref} className="relative rounded-md overflow-hidden">
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
          className="resize-none w-full pr-4 pl-2 pt-2 pb-24 md:pb-9 
           border border-primary-100 bg-transparent rounded-md
             placeholder:text-sm
             overflow-y-hidden
              appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        ></textarea>
        <div className="absolute bottom-5 right-3 text-sm font-body">
          {commentLength} / 280
        </div>
        <div
          style={{
            width: `${progressbarWidth}px` || "1px",
          }}
          className={`absolute bottom-[6px] rounded-bl-sm ${
            parseInt(progressbarWidth) === divWidth
              ? "rounded-br-sm"
              : "rounded-br-sm rounded-tr-sm"
          }
       left-0 bg-accent-400 h-1`}
        ></div>
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
      className={`mt-6 rounded-md mx-auto bg-primary-100 w-full h-full
       py-2 
       text-white border
border-gray-700 hover:bg-transparent transition-all duration-300
appearance-none focus:ring ring-primary-400 shadow-md`}
    >
      Kaydet
    </button>
  );
}

function Form({ setShowPopup, isEditComment, rating }) {
  const [comment, setComment] = useState(rating?.comment);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedGif, setSelectedGif] = useState(rating?.gif);

  const handleClick = async () => {
    setIsLoading(true);
    const response = await saveComment(comment, rating.ratingId, selectedGif);

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
        comment={comment}
        isEditComment={isEditComment}
        rating={rating}
        setComment={setComment}
      />
      <Gif selectedGif={selectedGif} setSelectedGif={setSelectedGif} />
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
    <div
      className="fixed top-0 left-0 min-h-screen w-full
     flex justify-center items-center  z-50"
    >
      <OpacityBackground setShowPopup={setShowPopup} />
      <div
        className="max-h-[40rem] overflow-y-auto 
       relative z-20 bg-primary-400 w-full mx-8 md:w-1/3 p-6
        rounded-md border border-gray-700"
      >
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
