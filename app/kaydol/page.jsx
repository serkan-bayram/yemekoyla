import AuthHeader from "../components/Auth/AuthHeader";
import SignUpForm from "./components/SignUpForm";
import TextWithLink from "../components/TextWithLink";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/Auth/AuthContainer";

export default async function Page() {
  return (
    <AuthContainer>
      <AuthHeader text="Kaydol" />
      <SignUpForm />
      <div className="text-center py-8">
        <TextWithLink
          text="Zaten hesabın var mı?"
          href="/giris"
          linkText="Giriş Yap."
        />
      </div>
    </AuthContainer>
  );
}
