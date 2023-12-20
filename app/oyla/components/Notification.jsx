"use client";

import { useState } from "react";
import { useEffect } from "react";
import Image from "next/image";

export default function Notification({ id, title, content }) {
  const [isDelete, setIsDelete] = useState(false);
  const [isCheckCompleted, setIsCheckCompleted] = useState(false);
  const [isApplyAnimation, setIsApplyAnimation] = useState(false);

  // Check first, is current notifications is deleted already by user
  useEffect(() => {
    const deletedNotifications =
      localStorage.getItem("deleted")?.split(",") || [];

    if (deletedNotifications.includes(id)) setIsDelete(true);

    // Wait until useEffect is completed to prevent flashing
    setIsCheckCompleted(true);

    // animate-start-progressbar lasts 10 seconds, it is important to change if
    // we change 10000
    setTimeout(() => {
      setIsApplyAnimation(true);
    }, 10000);
  }, []);

  // If delete button is clicked, save it in localStorage to check it later
  const handleDelete = () => {
    const deletedNotifications =
      localStorage.getItem("deleted")?.split(",") || [];

    deletedNotifications.push(id);

    localStorage.setItem("deleted", deletedNotifications);

    setIsApplyAnimation(true);
  };

  if (isApplyAnimation) {
    setTimeout(() => {
      setIsDelete(true);
    }, 500);
  }

  if (isDelete) {
    return;
  }

  return (
    isCheckCompleted && (
      <div
        onClick={handleDelete}
        className={`${
          isApplyAnimation
            ? "animate-hide-notification"
            : "animate-show-notification "
        } flex flex-col gap-2
       bg-background border
       cursor-pointer
        border-primary rounded-md p-3 shadow relative`}
      >
        <div className="font-heading font-bold">{title}</div>

        <p className="font-body">{content}</p>
        <button className="mt-2 ml-auto hover:scale-110 transition-all">
          <Image
            alt="Bildirimi Sil."
            width={24}
            height={24}
            src={"/remove.png"}
          />
        </button>
        <div
          className={`absolute left-0 bottom-0 h-1 bg-accent 
        animate-start-progressbar
        
        `}
        ></div>
      </div>
    )
  );
}
