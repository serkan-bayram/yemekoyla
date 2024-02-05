"use client";
import Button from "./Button";
import Link from "next/link";

export function Logout() {
  return (
    <div className="w-fit mt-auto absolute bottom-5 left-1/2 -translate-x-1/2">
      <Link href={"/cikis"}>
        <Button text={"Çıkış Yap"} variant={"danger"} />
      </Link>
    </div>
  );
}
