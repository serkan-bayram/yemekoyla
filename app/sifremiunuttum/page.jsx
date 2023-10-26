import { redirect } from "next/navigation";
import Header from "../components/Header";
import { getSession } from "../components/getSession";
import AltText from "../components/AltText";
import OnlyLogoNavbar from "../components/OnyLogoNavbar";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

export default async function Page() {
  const { session } = await getSession();

  // if the user is already authenticated it shouldn't see the login page
  if (session) {
    redirect("/oyla");
  }

  return (
    <>
      <OnlyLogoNavbar />
      <div className="w-full h-[100dvh]  flex  justify-center items-center">
        <div className="w-5/6 lg:w-1/3 h-5/6 relative bg-secondary rounded-md border border-primary shadow">
          <Header text="Şifremi Unuttum" />
          <ForgotPasswordForm />
          <AltText text="" href="/giris" linkText="Geri Dön" />
        </div>
      </div>
    </>
  );
}
