import Header from "../components/Header";
import VerifyForm from "./components/VerifyForm";
import { getSession } from "../components/getSession";
import OnlyLogoNavbar from "../components/OnyLogoNavbar";
import { redirect } from "next/navigation";
import SignOutButton from "../components/SignOutButton";

// This page is not going to be used for now.
export default async function Page() {
  redirect("/kaydol");

  return (
    <>
      <div></div>
      {/* <OnlyLogoNavbar />
      <div
        className="lg:w-1/3 lg:mx-auto 
     lg:pt-24 mt-16"
      >
        <div>
          <Header text="Lütfen hesabınızı doğrulamak için E-postanıza gelen kodu giriniz." />
          <VerifyForm />
          <SignOutButton />
        </div>
      </div> */}
    </>
  );
}
