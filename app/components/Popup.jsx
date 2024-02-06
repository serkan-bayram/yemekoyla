export default function Popup({ children }) {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen 
    bg-black/50 fixed top-0 left-0 z-50 px-4 lg:px-0"
    >
      {children}
    </div>
  );
}
