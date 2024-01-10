"use client";

import { useState } from "react";
import Rating from "@mui/material/Rating";

export function BigStars({ rating, starRating, setStarRating }) {
  return (
    <Rating
      name="rating"
      value={starRating}
      precision={0.5}
      size="medium"
      sx={{
        "& .MuiRating-iconEmpty": {
          color: "#d1d5db",
        },
      }}
      onChange={(event, newValue) => {
        if (newValue === null) {
          setStarRating(0);
        } else {
          setStarRating(newValue);
        }
      }}
    />
  );
}

// #111214
