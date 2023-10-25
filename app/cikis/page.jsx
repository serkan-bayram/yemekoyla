import { redirect } from "next/navigation";
import { getSession } from "../components/getSession";
import SignOutForm from "./components/SignOutForm";

export default async function Page() {
  const { session } = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center h-screen px-12">
      <div className="bg-secondary p-12 rounded-md text-center shadow border border-primary">
        <h1 className="text-white mb-12">
          Çıkış yapmak istediğinize emin misiniz?
        </h1>
        <SignOutForm />
      </div>
    </div>
  );
}
