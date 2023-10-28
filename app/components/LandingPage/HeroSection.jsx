import HeroHeading from "./HeroHeading";
import SignUpButton from "./SignUpButton";
import SignInButton from "./SignInButton";
import ScrollTarget from "./ScrollTarget";
import { getSession } from "../Functions/getSession";

export default async function HeroSection() {
  const backgroundStyles = {
    backgroundColor: "#191b1f",
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23292a33' fill-opacity='0.21'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  };

  const { session } = await getSession();

  return (
    <section className="w-full  pt-24 pb-36" style={backgroundStyles}>
      <div className="w-full px-12 flex flex-col items-center">
        <ScrollTarget id="home" />
        <HeroHeading />
        {!!session ? (
          <SignUpButton href="/oyla" text="Oyla" />
        ) : (
          <SignUpButton href="/kaydol" text="Kaydol" />
        )}
        {!session && <SignInButton />}
      </div>
    </section>
  );
}
