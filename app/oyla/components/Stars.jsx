"use client";

import { useState } from "react";
import Rating from "@mui/material/Rating";

export function BigStars({ rating }) {
  const [value, setValue] = useState(parseFloat(rating));

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center gap-2 justify-center mt-4 ">
        <Rating
          name="rating"
          value={value}
          precision={0.5}
          size="large"
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "#d1d5db",
            },
          }}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </div>
      <div className="mt-4 text-gray-300 text-sm">
        {value ? value * 2 : 0} / 10
      </div>
    </div>
  );
}

// #111214
