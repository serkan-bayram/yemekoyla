import "../styles/globals.css";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer
          position="top-center"
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
