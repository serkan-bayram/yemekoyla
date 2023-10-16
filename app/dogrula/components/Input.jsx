"use client";

import { useState } from "react";

export default function Input({ placeholder, setValue }) {
  return (
    <div className="w-full py-2 rounded-md border border-primary">
      <input
        className="w-full pr-4 bg-transparent pl-4 placeholder:text-sm appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
