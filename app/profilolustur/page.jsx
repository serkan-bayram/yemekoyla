import Header from "../components/Header";
import CreateProfileForm from "./components/CreateProfileForm";
import { getSession } from "../components/getSession";
import { redirect } from "next/navigation";
import Notification from "../components/Notification";
import SignOutButton from "../components/SignOutButton";

export default async function Page() {
  const { permission } = await getSession();

  if (permission !== "almostUser") {
    redirect("/oyla");
  }

  return (
    <>
      <div className="w-full h-[100dvh] flex justify-center items-center">
        <div className="w-5/6 lg:w-1/3 h-5/6 relative bg-secondary rounded-md border border-primary shadow">
          <Header text="Profilinizi Oluşturun" />
          <CreateProfileForm />
          <SignOutButton />
        </div>
        <Notification text="Bu bilgiler daha sonra giriş yapılırken kullanılacaktır." />
      </div>
    </>
  );
}
