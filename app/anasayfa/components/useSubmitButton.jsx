"use client";

import { useEffect, useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

// This function should be called from a child of form element
export function useSubmitButton(state) {
  // is form pending
  const { pending } = useFormStatus();

  // We shouldn't stop loading before animation is over
  // for a better look
  // even if response is quick
  const [isAnimationOver, setIsAnimationOver] = useState(false);

  // Controls the loading animation
  const [loading, setLoading] = useState(false);

  // Response from action: true or false
  const { message } = state;

  // onAnimationEnd
  const handleAnimationEnd = () => {
    setIsAnimationOver(true);
  };

  useEffect(() => {
    // The action is started to work
    if (pending) {
      setLoading(true);
    }

    // If animation is over and message is
    // different than null (a value is returned from action)
    // We can stop loading animation
    if (isAnimationOver && message !== null) {
      setLoading(false);
    }
  }, [pending, isAnimationOver, message]);

  return { loading, message, handleAnimationEnd };
}
