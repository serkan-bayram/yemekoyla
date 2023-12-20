"use client";

import { useState } from "react";
import Options from "./Options";
import Option from "./Option";

export default function Client() {
  const [option, setOption] = useState(null);

  return (
    <>
      <Options setOption={setOption} />
      <Option option={option} />
    </>
  );
}
