import AuthHeader from "../components/Auth/AuthHeader";
import SignInForm from "./components/SignInForm";
import TextWithLink from "../components/TextWithLink";
import AuthContainer from "../components/Auth/AuthContainer";

export default async function Page() {
  return (
    <AuthContainer>
      <AuthHeader text="Giriş Yap" />
      <SignInForm />
      <div className="text-center py-12">
        <TextWithLink
          text="Hesabın yok mu?"
          href="/kaydol"
          linkText="Kaydol."
        />
      </div>
    </AuthContainer>
  );
}
