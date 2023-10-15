import "../styles/globals.css";
import AuthProvider from "./context/AuthProvider";

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
