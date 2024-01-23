import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "./loading";
import Status from "./components/Status";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { initActions } from "./components/Functions/actions";

export default async function RootLayout({ children }) {
  // Since top level await is not working in server actions properly
  // We use a hacky method to init actions
  await initActions();

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
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          defer
          src="https://kit.fontawesome.com/7ff7410141.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-primary-300">
        <Suspense fallback={<Loading />}>
          {children}
          <Status />
        </Suspense>

        <SpeedInsights />
        <Analytics />
        <ToastContainer
          position="top-center"
          theme="dark"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
