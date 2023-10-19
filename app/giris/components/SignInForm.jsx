"use client";

import { signIn } from "next-auth/react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// CEfqjkKDjQ7HD1F
export default function SignInForm() {
  const router = useRouter();

  const id = "notSignedIn";
  const notify = (message) => {
    toast.error(message, {
      toastId: id,
    });
  };

  // TODO: Move these validation functions to seperate files
  const handleSubmit = async (e) => {
    e.preventDefault();

    // get input data from form
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);

    // call signin function with data
    const { ok } = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    // if signin is ok redirect user
    if (ok) {
      router.push("/anasayfa");
    } else {
      notify("Bilgileriniz doğrulanamadı, lütfen tekrar deneyiniz.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-8 pt-12 flex flex-col gap-6">
      <Input placeholder="Kullanıcı Adı" name="username" />
      <Input placeholder="Şifre" name="password" />
      <Button text="Giriş Yap" />
    </form>
  );
}
