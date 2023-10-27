import { redirect } from "next/navigation";
import AuthHeader from "../components/AuthHeader";
import { getSession } from "../components/getSession";
import TextWithLink from "../components/TextWithLink";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/AuthContainer";

export default async function Page() {
  const { session } = await getSession();

  // if the user is already authenticated it shouldn't see the login page
  if (session) {
    redirect("/oyla");
  }

  return (
    <>
      <Navbar onlyLogo={true} />
      <AuthContainer>
        <AuthHeader text="Şifremi Unuttum" />
        <ForgotPasswordForm />
        <TextWithLink text="" href="/giris" linkText="Geri Dön" />
      </AuthContainer>
    </>
  );
}
