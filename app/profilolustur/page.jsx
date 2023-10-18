import Header from "../components/Header";
import CreateProfileForm from "./components/CreateProfileForm";
import { getSession } from "../components/getSession";
import { redirect } from "next/navigation";
import Notification from "../components/Notification";

export default async function Page() {
  const { permission } = await getSession();

  if (permission !== "almostUser") {
    redirect("/anasayfa");
  }

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-5/6 h-5/6 bg-secondary rounded-md border border-primary shadow">
          <Header text="Profilinizi Oluşturun" />
          <CreateProfileForm />
        </div>
        <Notification text="Bu bilgiler daha sonra giriş yapılırken kullanılacaktır." />
      </div>
    </>
  );
}
