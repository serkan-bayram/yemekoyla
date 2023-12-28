"use client";

import { useEffect } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import Loading from "../../components/LoadingButton";
import disableScroll from "disable-scroll";

export function SubmitButtonGuest() {
  return (
    <div className="flex items-center gap-1 pt-6 w-1/2 md:w-1/3 mx-auto min-w-[250px]">
      <button
        type="button"
        className={`rounded-md mx-auto bg-primary w-full h-full py-2  text-white border
 border-gray-700 hover:bg-transparent transition-all duration-300
  appearance-none focus:ring ring-secondary shadow-md cursor-not-allowed`}
      >
        Kaydet
      </button>
    </div>
  );
}

export default function SubmitButton({
  showPopup,
  setShowPopup,
  isLoading,
  state,
  rating,
  setIsEditComment,
}) {
  const { pending } = useFormStatus();

  const error = (message) => {
    toast.error(message);
  };

  const success = (message) => {
    toast.success(message);
  };

  useEffect(() => {
    if (!pending && state.message === false) {
      error("Oylama kaydedilemedi, lütfen tekrar deneyiniz.");
    }

    if (!pending && state.message) {
      if (state?.isAlreadySaved) {
        success("Oylama güncellendi.");
      } else {
        success("Oylama kaydedildi.");
      }
      if (rating?.comment <= 0) {
        setShowPopup(true);
        setIsEditComment(false);
      }
    }
  }, [pending]);

  useEffect(() => {
    if (showPopup) {
      disableScroll.on();
    } else {
      disableScroll.off();
    }
  }, [showPopup]);

  return (
    <div className="flex items-center gap-1 pt-6 w-1/2 md:w-1/3 mx-auto min-w-[250px]">
      {pending ? (
        <Loading />
      ) : (
        <button
          type="submit"
          className={`rounded-md mx-auto bg-primary w-full h-full py-2  text-white border
     border-gray-700 hover:bg-transparent transition-all duration-300
      appearance-none focus:ring ring-secondary shadow-md`}
        >
          Kaydet
        </button>
      )}
    </div>
  );
}
