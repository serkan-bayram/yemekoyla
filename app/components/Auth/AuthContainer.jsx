import { Logo } from "../Navbar/Logo";

// Container for /giris, /kaydol etc..
export default function AuthContainer({ children, noLogo }) {
  return (
    <div
      className="flex flex-col gap-8 
    justify-center items-center w-full h-screen"
    >
      {!noLogo && <Logo />}
      <div
        className="flex flex-col gap-8 bg-primary-400
     lg:w-1/3 py-12 px-4 rounded-md border
   border-primary-100 "
      >
        {children}
      </div>
    </div>
  );
}
