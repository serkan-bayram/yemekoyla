"use client";

import { useState } from "react";
import Rating from "@mui/material/Rating";

export function BigStars() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex items-center pt-4">
      <Rating
        name="simple-controlled"
        value={value}
        precision={0.5}
        size="large"
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
