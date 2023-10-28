import AuthHeader from "../components/Auth/AuthHeader";
import TextWithLink from "../components/TextWithLink";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/Auth/AuthContainer";

export default async function Page() {
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
