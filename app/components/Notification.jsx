"use client";

import { useEffect, useState } from "react";

function HideButton({ setNotification }) {
  return (
    <button
      onClick={() => {
        setNotification(false);
      }}
      className="absolute -top-2 -right-2 rounded-full w-6 aspect-square bg-primary border border-secondary"
    >
      <div className="w-full h-full relative rounded-full">
        <div className="w-2/3 h-1 absolute bg-white rounded-sm rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"></div>
        <div className="w-2/3 h-1 absolute bg-white rounded-sm -rotate-45 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 "></div>
      </div>
    </button>
  );
}

export default function Notification({ text }) {
  const [notification, setNotification] = useState("");

  useEffect(() => {
    setNotification(true);
    setTimeout(() => {
      setNotification(false);
      // 5000 ms is important and if it'll be changed the animation duration should
      // be changed from tailwind config too
    }, 5000);
  }, []);

  // I had to check seperately animate-show-notification and hide because
  // when I check them like: notification ? "show" : "hide", this returns "hide" before even useEffect runs
  // and it glitches
  return (
    <>
      <div
        className={`
      ${notification ? "animate-show-notification" : ""}
      ${notification !== "" ? "animate-hide-notification" : ""} 
      fixed -bottom-32 w-2/3 h-16 p-2 flex justify-center md:justify-start rounded-sm border border-primary 
      text-white text-sm  bg-background 
      ${
        notification ? "after:animate-start-progressbar" : "after:w-full"
      } after:bg-primary after:h-1 after:absolute 
      after:bottom-0 after:left-0 after:rounded-sm after:rounded-tl-none after:rounded-tr-none
      `}
      >
        {text}
        <HideButton setNotification={setNotification} />
      </div>
    </>
  );
}
