import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "./loading";
import Status from "./components/Status";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
        <Suspense fallback={Loading}>
          {children} <Status />
        </Suspense>
        <SpeedInsights />
        <ToastContainer
          position="top-center"
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
