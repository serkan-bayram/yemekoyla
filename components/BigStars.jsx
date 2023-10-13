"use client";

import { useState } from "react";

function Star({ index: starIndex, isSelected, setStars }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // change newArray's values according to click and set as new values
    const newArray = [false, false, false, false, false];

    newArray.forEach((item, index) => {
      if (index <= starIndex) newArray[index] = true;
    });

    setStars(newArray);

    setIsClicked(true);
  };

  const handleMouseOver = () => {
    // change newArray's values according to mouse and set as new values
    const newArray = [false, false, false, false, false];

    newArray.forEach((item, index) => {
      if (index <= starIndex) newArray[index] = true;
    });

    setStars(newArray);
  };

  const handleMouseLeave = () => {
    // we do not set values if user does not click
    const newArray = [false, false, false, false, false];

    if (!isClicked) setStars(newArray);
  };

  return (
    <button
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className={`${
          isSelected ? "text-yellow-300" : "text-gray-300"
        } w-6 h-6 pointer-events-none`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path
          className="pointer-events-none"
          d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
        />
      </svg>
    </button>
  );
}

export default function BigStars() {
  const [stars, setStars] = useState([false, false, false, false, false]);

  return (
    <div class="flex items-center space-x-2 pt-4">
      {stars.map((state, index) => {
        return <Star index={index} isSelected={state} setStars={setStars} />;
      })}
    </div>
  );
}
