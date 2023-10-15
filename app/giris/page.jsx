import Container from "./components/Container";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Page() {
  const sessions = await getServerSession(options);

  // if the user is already authenticated it shouldn't see the login page
  if (sessions) {
    redirect("/anasayfa");
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Container />
    </div>
  );
}
