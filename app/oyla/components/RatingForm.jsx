"use client";

import { useState } from "react";
import RatingContainer, { RatingContainerGuest } from "./RatingContainer";
import { saveRating } from "../../components/Functions/actions";
import SubmitButton, { SubmitButtonGuest } from "./SubmitButton";
import { experimental_useFormState as useFormState } from "react-dom";
import Popup from "./Popup";
import AddComment from "../../components/AddComment";

export function RatingFormGuest() {
  return (
    <div>
      <RatingContainerGuest />
      <SubmitButtonGuest />
    </div>
  );
}

export default function RatingForm({ rating }) {
  const initialState = {
    message: null,
  };

  const [state, formAction] = useFormState(saveRating, initialState);

  const [showPopup, setShowPopup] = useState(false);
  const [isEditComment, setIsEditComment] = useState(false);

  const ratingId = rating.ratingId;
  const menuId = rating.menuId;
  const userRating = rating.rating;
  const comment = rating.comment;

  return (
    <form action={formAction}>
      <input
        name="ratingId"
        value={ratingId || "-1"}
        className="hidden"
        readOnly
      />
      <input name="menuId" value={menuId || "-1"} className="hidden" readOnly />
      <AddComment
        setShowPopup={setShowPopup}
        setIsEditComment={setIsEditComment}
        comment={comment}
        userRating={userRating}
      />
      <Popup
        isEditComment={isEditComment}
        rating={rating}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
      <RatingContainer rating={userRating} />
      <SubmitButton
        rating={rating}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        setIsEditComment={setIsEditComment}
        state={state}
      />
    </form>
  );
}
