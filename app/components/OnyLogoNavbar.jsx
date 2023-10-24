import Logo from "./LandingPage/Logo";

export default function OnlyLogoNavbar() {
  return (
    <div
      className="fixed top-0 z-50 flex items-center
   text-white justify-between px-12 w-full h-12 
   bg-secondary shadow border-b border-b-primary"
    >
      <Logo />
    </div>
  );
}
