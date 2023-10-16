import Header from "../giris/components/Header";
import VerifyForm from "./components/VerifyForm";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Page() {
  const sessions = await getServerSession(options);

  // if the user is already authenticated it shouldn't see the login page
  if (sessions) {
    redirect("/anasayfa");
  }

  return (
    <>
      <Header text="Lütfen hesabınızı doğrulamak için mailinize gelen kodu giriniz." />
      <VerifyForm />
    </>
  );
}
