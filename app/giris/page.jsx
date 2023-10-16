import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Header from "./components/Header";
import SignInForm from "./components/SignInForm";
import Link from "next/link";

export default async function Page() {
  const sessions = await getServerSession(options);

  // if the user is already authenticated it shouldn't see the login page
  if (sessions) {
    redirect("/anasayfa");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-5/6 h-5/6 bg-secondary rounded-md border border-primary shadow">
        <Header text="Giriş Yap" />
        <SignInForm />
        <div className="w-full text-center text-sm text-gray-700 pt-6">
          Hesabın yok mu?{" "}
          <Link className="text-gray-500" href="/kaydol">
            Kaydol.
          </Link>
        </div>
      </div>
    </div>
  );
}
