"use client";

import { useState } from "react";
import RatingContainer from "./RatingContainer";
import { saveRating } from "./saveRating";
import SubmitButton from "./SubmitButton";
import { experimental_useFormState as useFormState } from "react-dom";

export default function RatingForm() {
  const initialState = {
    message: null,
  };

  const [state, formAction] = useFormState(saveRating, initialState);

  // Waiting for the fetch of getRating api
  const [isLoading, setIsLoading] = useState(true);

  return (
    <form action={formAction}>
      <RatingContainer setIsLoading={setIsLoading} isLoading={isLoading} />
      <SubmitButton isLoading={isLoading} state={state} />
    </form>
  );
}
