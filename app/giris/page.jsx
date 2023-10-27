import { redirect } from "next/navigation";
import AuthHeader from "../components/AuthHeader";
import SignInForm from "./components/SignInForm";
import { getSession } from "../components/getSession";
import TextWithLink from "../components/TextWithLink";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/AuthContainer";
import BottomTextWithLink from "../components/BottomTextWithLink";

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
        <AuthHeader text="Giriş Yap" />
        <SignInForm />
        <TextWithLink
          text="Hesabın yok mu?"
          href="/kaydol"
          linkText="Kaydol."
        />
        <BottomTextWithLink
          linkText="Şifremi Unuttum"
          href="/sifremiunuttum"
          text=""
        />
      </AuthContainer>
    </>
  );
}
