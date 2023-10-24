import "../styles/globals.css";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "./loading";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background">
        <AuthProvider>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </AuthProvider>
        <ToastContainer
          position="top-center"
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
