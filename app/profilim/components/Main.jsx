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

export default function Main({ userEmail, username }) {
  const [dashboard, setDashboard] = useState("settings");
  const [popup, setPopup] = useState(false);

  return (
    <>
      <main
        className="w-full  px-4 lg:px-24 py-6
   h-[calc(100vh-4rem)]"
      >
        <div
          className="h-full w-full rounded-lg 
    bg-primary-400 flex border border-primary-100"
        >
          <div
            className="h-full  pt-4 px-4 w-1/4 relative
      "
          >
            <RightSeperator />
            <Avatar />
            <BottomSeperator />
            <ButtonGroup setDashboard={setDashboard} />
            <Logout />
          </div>
          <div className="p-8">
            <Dashboard
              username={username}
              userEmail={userEmail}
              dashboard={dashboard}
              setPopup={setPopup}
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
