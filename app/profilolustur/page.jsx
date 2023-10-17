import Header from "./components/Header";
import CreateProfileForm from "./components/CreateProfileForm";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Page() {
  // TODO: get sessions and permission from a reusable function
  const sessions = await getServerSession(options);

  const permission = sessions?.user.record.permission || null;

  if (permission !== "almostUser") {
    redirect("/anasayfa");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-5/6 h-5/6 bg-secondary rounded-md border border-primary shadow">
        <Header text="Profilinizi Oluşturun" />
        <CreateProfileForm />
      </div>
    </div>
  );
}
