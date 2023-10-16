"use client";

import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { verifyCode } from "../../fetchFunctions/verifyCode";

export default function VerifyInputs() {
  const [value, setValue] = useState(null);

  const handleClick = async () => {
    console.log(value);
    const data = { code: value };

    const response = await verifyCode(data);

    console.log(response);
  };

  return (
    <>
      <Input placeholder="Kod" setValue={setValue} />
      <Button handleClick={handleClick} text="Doğrula" />
    </>
  );
}
