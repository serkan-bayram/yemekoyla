"use client";

import { useState } from "react";
import Options from "./Options";
import Option from "./Option";

export default function Client({ users, ratings }) {
  const [option, setOption] = useState(null);

  return (
    <>
      <Options setOption={setOption} />
      <Option users={users} option={option} ratings={ratings} />
    </>
  );
}
