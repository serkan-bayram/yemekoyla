import AuthHeader from "../components/Auth/AuthHeader";
import CreateProfileForm from "./components/CreateProfileForm";
import SignOutButton from "../components/SignOutButton";
import AuthContainer from "../components/Auth/AuthContainer";

export default async function Page() {
  return (
    <>
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
