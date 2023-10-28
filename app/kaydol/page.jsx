import { redirect } from "next/navigation";
import AuthHeader from "../components/Auth/AuthHeader";
import SignUpForm from "./components/SignUpForm";
import { getSession } from "../components/Functions/getSession";
import TextWithLink from "../components/TextWithLink";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/Auth/AuthContainer";

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
        <AuthHeader text="Kaydol" />
        <SignUpForm />
        <TextWithLink
          text="Zaten hesabın var mı?"
          href="/giris"
          linkText="Giriş Yap."
        />
      </AuthContainer>
    </>
  );
}
