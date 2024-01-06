import AuthHeader from "../components/Auth/AuthHeader";
import TextWithLink from "../components/TextWithLink";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/Auth/AuthContainer";
import MyProfile from "./components/MyProfile";
export default async function Page() {
  return (
    <>
      <Navbar />
      <AuthContainer noLogo={true}>
        <AuthHeader text="Profilim" />
        <MyProfile />
        <div className="text-center py-4">
          <TextWithLink text="" href="/oyla" linkText="Geri Dön" />
        </div>
      </AuthContainer>
    </>
  );
}
