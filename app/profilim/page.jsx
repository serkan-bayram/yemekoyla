import AuthHeader from "../components/Auth/AuthHeader";
import TextWithLink from "../components/TextWithLink";
import Navbar from "../components/Navbar/Navbar";
import AuthContainer from "../components/Auth/AuthContainer";
import MyProfile from "./components/MyProfile";
export default async function Page() {
  return (
    <>
      <Navbar />
      <AuthContainer>
        <AuthHeader text="Profilim" />
        <MyProfile />
        <TextWithLink text="" href="/oyla" linkText="Geri Dön" />
      </AuthContainer>
    </>
  );
}
