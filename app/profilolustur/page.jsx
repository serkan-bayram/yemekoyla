import AuthHeader from "../components/Auth/AuthHeader";
import CreateProfileForm from "./components/CreateProfileForm";
import SignOutButton from "../components/SignOutButton";
import AuthContainer from "../components/Auth/AuthContainer";
import Navbar from "../components/Navbar/Navbar";

export default async function Page() {
  return (
    <AuthContainer>
      <AuthHeader text="Profilinizi Oluşturun" />
      <CreateProfileForm />
      <SignOutButton />
    </AuthContainer>
  );
}
