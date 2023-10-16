"use client";

import { useState } from "react";
import Button from "./Button";
import Input from "./Input";

export default function SignUpInputs() {
  return (
    <>
      <Input placeholder="Okul Maili" />
      <Button text="Kaydol" />
    </>
  );
}
