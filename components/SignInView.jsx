"use client";

import { useState } from "react";

function Input({ placeholder }) {
  return (
    <input
      className="bg-transparent pl-4 placeholder:text-sm appearance-none outline-none placeholder:text-gray-500 text-white text-sm"
      placeholder={placeholder}
    />
  );
}

function SignInButton({ text }) {
  return (
    <button className="w-full h-full flex justify-center items-center text-center bg-transparent appearance-none text-white text-sm">
      {text}
    </button>
  );
}

function Header({ text }) {
  return <h1 className="text-white">{text}</h1>;
}

function SwitchView({ text, viewToSwitch, setView, viewSignIn, viewSignUp }) {
  const handleClick = () => {
    setView((prevValue) => {
      return prevValue.viewName === "signin" ? viewSignUp : viewSignIn;
    });
  };

  return (
    <div className="w-full text-center text-sm text-gray-700">
      {text}{" "}
      <button onClick={handleClick} className="text-gray-500">
        {viewToSwitch}
      </button>
    </div>
  );
}

// creating this in the same page is unnecessarily crowded, it will be separeted into two pages
export default function SignInView() {
  const viewSignIn = {
    viewName: "signin",
    header: "Giriş Yap",
    inputs: ["Kullanıcı Adı", "Şifre"],
    button: "Giriş Yap",
    switchView: { text: "Hesabın yok mu?", viewToSwitch: "Kayıt Ol." },
  };

  const viewSignUp = {
    viewName: "signup",
    header: "Kayıt Ol",
    inputs: ["Okul Mailiniz"],
    button: "Kayıt Ol",
    switchView: { text: "Zaten hesabın var mı?", viewToSwitch: "Giriş Yap." },
  };

  const [view, setView] = useState(viewSignIn);

  return (
    <>
      <div className="w-full pt-6 flex items-center justify-center transition-all">
        <Header text={view.header} />
      </div>
      <div className="px-8 pt-12 flex flex-col gap-6">
        {view.inputs.map((input) => {
          return (
            <div className="w-full py-2 rounded-md border border-primary">
              <Input placeholder={input} />
            </div>
          );
        })}
        <div className="w-full py-2 rounded-md bg-primary border border-gray-500">
          <SignInButton text={view.button} />
        </div>
        <SwitchView
          text={view.switchView.text}
          viewToSwitch={view.switchView.viewToSwitch}
          setView={setView}
          viewSignIn={viewSignIn}
          viewSignUp={viewSignUp}
        />
      </div>
    </>
  );
}
