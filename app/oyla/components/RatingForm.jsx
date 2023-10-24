"use client";

import RatingContainer from "./RatingContainer";
import { saveRating } from "./saveRating";
import SubmitButton from "./SubmitButton";
import { experimental_useFormState as useFormState } from "react-dom";

export default function RatingForm() {
  const initialState = {
    message: null,
  };

  const [state, formAction] = useFormState(saveRating, initialState);

  return (
    <form action={formAction}>
      <RatingContainer />
      <SubmitButton state={state} />
    </form>
  );
}
