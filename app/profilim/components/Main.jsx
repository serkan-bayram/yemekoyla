"use client";

import { useState } from "react";
import Avatar from "./Avatar";
import ButtonGroup from "./ButtonGroup";
import Dashboard from "./Dashboard";
import { RightSeperator, BottomSeperator } from "./Seperators";
import Popup from "../../components/Popup";
import { ChangeUsernamePopup } from "./ChangeUsernamePopup";
import { ChangePasswordPopup } from "./ChangePasswordPopup";
import { Logout } from "./Logout";

export default function Main({ comments, userEmail, username }) {
  const [dashboard, setDashboard] = useState(false);
  const [popup, setPopup] = useState(false);

  return (
    <>
      <main
        className="w-full lg:pt-6  px-4 lg:px-24 py-6
   h-screen lg:h-[calc(100vh-4rem)] pt-24 bg-primary-400 lg:bg-transparent"
      >
        <div
          className="h-full w-full rounded-lg 
    bg-primary-400 lg:flex lg:border border-primary-100 lg:overflow-auto"
        >
          <div
            className="lg:h-full lg:sticky relative pt-4 px-4 
            lg:w-1/4 top-0 left-0
      "
          >
            <RightSeperator />
            <Avatar />
            <BottomSeperator />
            <ButtonGroup setDashboard={setDashboard} />
            <Logout />
          </div>
          <div className="p-8  w-full">
            <Dashboard
              username={username}
              userEmail={userEmail}
              dashboard={dashboard}
              setPopup={setPopup}
              comments={comments}
              setDashboard={setDashboard}
            />
          </div>
        </div>
      </main>
      {popup && (
        <Popup>
          {popup === "username" ? (
            <ChangeUsernamePopup setPopup={setPopup} />
          ) : popup === "password" ? (
            <ChangePasswordPopup setPopup={setPopup} />
          ) : (
            <div></div>
          )}
        </Popup>
      )}
    </>
  );
}
