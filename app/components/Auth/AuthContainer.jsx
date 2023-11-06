// Container for /giris, /kaydol etc..
export default function AuthContainer({ children }) {
  return (
    <div className="w-full h-[100dvh] flex justify-center items-center">
      <div
        className="relative w-5/6 lg:w-1/3 h-5/6 bg-secondary overflow-y-auto pb-6
        rounded-md border border-primary shadow"
      >
        {children}
      </div>
    </div>
  );
}
