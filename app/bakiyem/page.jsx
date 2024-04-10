import Navbar from "../components/Navbar/Navbar";
import { Icon } from "../components/Input/Icon";
import Link from "next/link";
import Form from "./components/Form";
import { getSession } from "../components/Functions/getSession";
import pb from "../components/Functions/authAsAdmin";
import Footer from "../(landing)/components/Footer";

function Header() {
  return (
    <h1
      className="mt-24 font-heading lg:text-5xl md:text-4xl text-5xl text-center  font-semibold
           text-white"
    >
      Yemekoyla ile <span className="text-accent-400">Akıllı Bakiye</span>
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
  const { session } = await getSession();

  const user =
    session && (await pb.collection("users").getOne(session.user.record.id));

  const isTelegramVerified = user && user.isTelegramVerified;

  return (
    <>
      <Navbar />
      <main className="lg:px-24 px-4 pb-8 flex flex-col items-center">
        <Header />
        <div className="lg:mx-60 md:mx-36 mt-12 flex flex-col gap-12">
          <Callout>
            <div className="flex items-center gap-2">
              <Icon name="fa-solid fa-circle-exclamation" />
              Bu özellik Beta aşamasındadır.
            </div>
          </Callout>
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-4">
              <SubHeading text="Ne işe yarar?" />
              <p className=" font-body text-lg">
                Bu özellik sayesinde bakiyeniz güncel yemek tutarının altına
                düştüğünde Telegram üzerinden bildirim alacaksınız. Bakiye
                kontrolleri her sabah saat 10 civarı yapılıyor.
              </p>
              <p className="flex flex-col gap-4 text-lg">
                <span>
                  Bu özelliğin çalışması için Yemekoyla hesabınızı Telegram ile
                  bağlamanız gerekiyor, şu linkten yapabilirsiniz:{" "}
                  <Link
                    target="_blank"
                    className="text-accent-400 hover:text-accent-300 transition-all font-semibold font-body"
                    href={"/telegram"}
                  >
                    Link
                  </Link>
                </span>
              </p>
              {isTelegramVerified ? (
                <Form />
              ) : (
                <div className="mt-4">
                  <Callout>
                    Lütfen Yemekoyla hesabınızı Telegram ile bağlayınız.
                  </Callout>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
