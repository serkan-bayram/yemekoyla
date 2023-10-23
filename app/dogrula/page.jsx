import Header from "../components/Header";
import VerifyForm from "./components/VerifyForm";
import { redirect } from "next/navigation";
import { getSession } from "../components/getSession";

export default async function Page() {
  const { session } = await getSession();

  // if the user is already authenticated it shouldn't see the login page
  if (session) {
    redirect("/anasayfa");
  }

  return (
    <div
      className="lg:w-1/3 lg:mx-auto lg:h-screen
     lg:pt-24 mt-16"
    >
      <div>
        <Header text="Lütfen hesabınızı doğrulamak için E-postanıza gelen kodu giriniz." />
        <VerifyForm />
      </div>
    </div>
  );
}
