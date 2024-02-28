import Navbar from "../components/Navbar/Navbar";
import { Icon } from "../components/Input/Icon";
import Link from "next/link";
import Form from "./components/Form";
import { getSession } from "../components/Functions/getSession";
import pb from "../components/Functions/authAsAdmin";

function Header() {
  return (
    <h1
      className="mt-24 font-heading lg:text-5xl md:text-4xl text-5xl text-center  font-semibold
           text-white"
    >
      Yemekoyla ile Kolay Bakiye
    </h1>
  );
}

function Callout({ children }) {
  return (
    <div className="text-center  bg-primary-400 p-3 border border-primary-100 rounded-sm">
      {children}
    </div>
  );
}

function SubHeading({ text }) {
  return (
    <h2 className="text-3xl text-white font-heading font-semibold text-start">
      {text}
    </h2>
  );
}

export default async function Page() {
  return (
    <>
      <Navbar />
      <main className="lg:px-24 px-4 pb-8 flex flex-col items-center">
        <Header />
        <div className="lg:mx-60 md:mx-36 mt-12 flex flex-col gap-12">
          <Callout>
            <div className="flex items-center gap-2">
              <Icon name="fa-solid fa-circle-exclamation" />
              Okuldan atılmamak istediğim için bu özellik sadece VIP üyelerimize
              açılmıştır.
            </div>
          </Callout>
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <SubHeading text="Ne işe yarar?" />
              <p className=" font-body">
                Sen vermek bana okul numaranı ben vermek sana haber bakiyen
                azaldığı zaman.
              </p>
              <p className="flex flex-col gap-4">
                <span>
                  Bu özelliğin çalışması için Yemekoyla hesabınızı Telegram ile
                  bağlamanız lazım, şu linkten yapabilirsiniz:{" "}
                  <Link
                    target="_blank"
                    className="text-accent-400 font-semibold font-body"
                    href={"/telegram"}
                  >
                    Şu Link
                  </Link>
                </span>
              </p>
              <Form />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
