"use client";
import Button from "./Button";
import Link from "next/link";

export function Logout() {
  return (
    <div
      className="w-fit mx-auto mt-8 lg:mt-auto lg:absolute 
    lg:bottom-5 lg:left-1/2 lg:-translate-x-1/2"
    >
      <Link href={"/cikis"}>
        <Button text={"Çıkış Yap"} variant={"danger"} />
      </Link>
    </div>
  );
}
