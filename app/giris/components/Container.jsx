"use client";

import { useState } from "react";
import SignInView from "./SignInView";
import SignUpView from "./SignUpView";

export default function Container() {
  const [view, setView] = useState("SignIn");

  const handleClick = () => {
    setView((prevValues) => {
      return prevValues === "SignIn" ? "SignUp" : "SignIn";
    });
  };

  return (
    <div className="w-5/6 h-5/6 bg-secondary rounded-md border border-primary shadow">
      {view === "SignIn" ? <SignInView /> : <SignUpView />}
      <div className="w-full text-center text-sm text-gray-700 pt-6">
        {view === "SignIn" ? "Hesabın yok mu? " : "Zaten hesabın var mı? "}
        <button onClick={handleClick} className="text-gray-500">
          {view === "SignIn" ? "Kayıt Ol." : "Giriş Yap."}
        </button>
      </div>
    </div>
  );
}
