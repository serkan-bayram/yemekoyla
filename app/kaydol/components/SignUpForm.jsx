import SignUpInputs from "./SignUpInputs";
import { sendEmail } from "../../fetchFunctions/sendEmail";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function SignUpForm() {
  const onAction = async () => {
    "use server";

    const data = { email: "myemail@example.com" };

    const response = await sendEmail(data);

    if (response.ok) redirect("/dogrula");
  };

  return (
    <form action={onAction} className="px-8 pt-12 flex flex-col gap-6">
      <SignUpInputs />
    </form>
  );
}

// const all = response.headers.entries();

// for (const pair of all) {
//   if (pair[0] === "set-cookie") {
//     const cookie = pair[1].split("codeToken=");
//     cookies().set("codeToken", cookie[1]);
//   }
// }
