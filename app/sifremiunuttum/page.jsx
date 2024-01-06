import AuthHeader from "../components/Auth/AuthHeader";
import TextWithLink from "../components/TextWithLink";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/Auth/AuthContainer";

export default async function Page() {
  return (
    <AuthContainer>
      <AuthHeader text="Şifremi Unuttum" />
      <ForgotPasswordForm />
      <div className="text-center mt-6 mb-3">
        <TextWithLink text="" href="/giris" linkText="Geri Dön" />
      </div>
    </AuthContainer>
  );
}
