export default function Popup({ children }) {
  return (
    <div
      className="flex justify-center items-center w-screen h-screen 
    bg-black/50 absolute top-0 left-0 z-50"
    >
      {children}
    </div>
  );
}
