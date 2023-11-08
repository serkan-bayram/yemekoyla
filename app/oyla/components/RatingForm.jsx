"use client";

import { Suspense, useState } from "react";
import RatingContainer from "./RatingContainer";
import { saveRating } from "./saveRating";
import SubmitButton from "./SubmitButton";
import { experimental_useFormState as useFormState } from "react-dom";
import Popup from "./Popup";

export default function RatingForm({ didUserCommented, userComment }) {
  const initialState = {
    message: null,
  };

  const [showPopup, setShowPopup] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);

  const [state, formAction] = useFormState(saveRating, initialState);

  // Waiting for the fetch of getRating api
  const [isLoading, setIsLoading] = useState(true);

  const handleEditComment = () => {
    setShowPopup(true);
    setIsEditComment(true);
  };

  return (
    <form action={formAction}>
      {didUserCommented ? (
        <div className="w-1/2 md:w-1/3 mx-auto min-w-[250px] my-2 mt-6">
          <button
            onClick={handleEditComment}
            className="bg-accent p-1 px-2 font-body text-sm rounded-sm"
            type="button"
          >
            Yorumunu Düzenle
          </button>
        </div>
      ) : (
        <div className="my-2 mt-6"></div>
      )}
      <Popup
        isEditComment={isEditComment}
        userComment={userComment}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
      <RatingContainer setIsLoading={setIsLoading} isLoading={isLoading} />
      <SubmitButton
        setIsEditComment={setIsEditComment}
        didUserCommented={didUserCommented}
        isLoading={isLoading}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        state={state}
      />
    </form>
  );
}
