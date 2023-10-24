"use client";

import { useEffect } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { toast } from "react-toastify";
import Loading from "../../components/LoadingButton";

export default function SubmitButton({ state }) {
  const { pending } = useFormStatus();

  const id = "rate";
  const error = (message) => {
    toast.error(message, {
      toastId: id,
    });
  };

  const success = (message) => {
    toast.success(message, {
      toastId: id,
    });
  };

  useEffect(() => {
    if (!pending && state.message === false) {
      error("Oylama kaydedilemedi, lütfen tekrar deneyiniz.");
    }

    if (!pending && state.message) {
      success("Oylama kaydedildi.");
    }
  }, [pending]);

  return (
    <div className="flex items-center gap-1 pt-6 w-1/2 md:w-1/3 mx-auto min-w-[250px]">
      {pending ? (
        <Loading />
      ) : (
        <button
          type="submit"
          className={`rounded-sm mx-auto bg-primary w-full h-full py-2  text-white border
     border-gray-700 appearance-none focus:ring ring-secondary shadow-md`}
        >
          Kaydet
        </button>
      )}
    </div>
  );
}
