"use client";

import { useState } from "react";
import Rating from "@mui/material/Rating";

export default function BigStars() {
  const [value, setValue] = useState(0);

  return (
    <div className="flex items-center space-x-2 pt-4">
      <Rating
        name="simple-controlled"
        value={value}
        precision={0.5}
        size="large"
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "#181A1E",
          },
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
