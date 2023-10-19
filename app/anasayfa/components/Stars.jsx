"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

export function BigStars() {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const asyncFunction = async () => {
      // BE CAREFUL, this might create cache
      const response = await fetch(
        "http://localhost:3000/api/ratings/getRating"
      );

      const { ok, savedRating } = await response.json();

      if (ok) setValue(parseFloat(savedRating));

      setIsLoading(false);
    };

    asyncFunction();
  }, []);

  return (
    <div className="flex items-center pt-4">
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
  );
}

export function SmallStars({ id }) {
  return (
    <Rating
      value={2}
      precision={0.5}
      sx={{
        "& .MuiRating-iconEmpty": {
          color: id % 2 == 0 ? "#282932" : "#111214",
        },
      }}
      readOnly
    />
  );
}
