import AuthHeader from "../components/Auth/AuthHeader";
import CreateProfileForm from "./components/CreateProfileForm";
import { getSession } from "../components/Functions/getSession";
import { redirect } from "next/navigation";
import Notification from "../components/Notification";
import SignOutButton from "../components/SignOutButton";
import AuthContainer from "../components/Auth/AuthContainer";

export default async function Page() {
  const { permission } = await getSession();

  if (permission !== "almostUser") {
    redirect("/oyla");
  }

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
