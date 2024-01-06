import { Logo } from "../Navbar/Logo";

// Container for /giris, /kaydol etc..
export default function AuthContainer({ children, noLogo }) {
  return (
    <div
      className="w-full h-screen flex flex-col items-center 
    justify-center gap-8 px-4 lg:p-64 xl:px-[28rem] "
    >
      {!noLogo && (
        <div className="flex ">
          <Logo />
        </div>
      )}
      <div
        className=" bg-secondary 
        rounded-md border border-primary shadow w-full px-8 pb-6 mb-8 "
      >
        {children}
      </div>
    </div>
  );
}
