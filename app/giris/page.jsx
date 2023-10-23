import { redirect } from "next/navigation";
import Header from "../components/Header";
import SignInForm from "./components/SignInForm";
import { getSession } from "../components/getSession";
import AltText from "../components/AltText";
import Navbar from "../components/LandingPage/Navbar";

export default async function Page() {
  const { session } = await getSession();

  // if the user is already authenticated it shouldn't see the login page
  if (session) {
    redirect("/anasayfa");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-5/6 lg:w-1/3 h-5/6 bg-secondary rounded-md border border-primary shadow">
        <Header text="Giriş Yap" />
        <SignInForm />
        <AltText text="Hesabın yok mu?" href="/kaydol" linkText="Kaydol." />
      </div>
    </div>
  );
}
