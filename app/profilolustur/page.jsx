import AuthHeader from "../components/Auth/AuthHeader";
import CreateProfileForm from "./components/CreateProfileForm";
import SignOutButton from "../components/SignOutButton";
import AuthContainer from "../components/Auth/AuthContainer";
import Navbar from "../components/Navbar/Navbar";

export default async function Page() {
  return (
    <>
      <Navbar onlyLogo={true} />
      <AuthContainer>
        <AuthHeader text="Profilinizi Oluşturun" />
        <CreateProfileForm />
        <SignOutButton />
      </AuthContainer>
    </>
  );
}

{
  /* <Notification text="Bu bilgiler daha sonra giriş yapılırken kullanılacaktır." /> */
}
