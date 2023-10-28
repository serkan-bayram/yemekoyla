import AuthHeader from "../components/Auth/AuthHeader";
import SignInForm from "./components/SignInForm";
import TextWithLink from "../components/TextWithLink";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/Auth/AuthContainer";
import BottomTextWithLink from "../components/BottomTextWithLink";

export default async function Page() {
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
