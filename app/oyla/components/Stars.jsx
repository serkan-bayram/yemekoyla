"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

export function BigStars({ isLoading, setIsLoading }) {
  const [value, setValue] = useState(0);

  // TODO: loading animation with loading stars
  useEffect(() => {
    const asyncFunction = async () => {
      // BE CAREFUL, this might create cache
      try {
        const response = await fetch(
          "http://localhost:3000/api/ratings/getRating"
        );

        const { ok, savedRating } = await response.json();

        if (ok) setValue(parseFloat(savedRating));
      } catch (error) {
        console.log("Can't fetch user rating.");
      }

      setIsLoading(false);
    };

    asyncFunction();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center gap-2 justify-center mt-4 ">
        <Rating
          name="rating"
          value={value}
          precision={0.5}
          size="large"
          className={isLoading ? "animate-pulse pointer-events-none" : ""}
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "#111214",
            },
          }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <div className="mt-4 text-gray-500 text-sm">
        {value ? value * 2 : 0} / 10
      </div>
    </div>
  );
}
