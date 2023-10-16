import { useState } from "react";
import Header from "./Header";
import SignUpAction from "./SignUpAction";

export default function SignUpView() {
  const serverHandleClick = () => {
    console.log("fetching data");
  };

  const [as, setAs] = useState(false);

  return (
    <>
      <Header text="Kayıt Ol" />
      <SignUpAction />
    </>
  );
}
