"use client";

import disableScroll from "disable-scroll";
import { useState } from "react";
import Logo from "./Logo";
import HamburgerMenuButton from "./HamburgerMenuButton";
import NavItems from "./NavItems";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prevValue) => {
      if (!prevValue === true) {
        disableScroll.on();
      } else {
        disableScroll.off();
      }
      return !prevValue;
    });
  };

  const closeMenu = () => {
    setIsOpen(false);
    disableScroll.off();
  };

  return (
    <div
      className="fixed top-0 z-50 flex items-center
     text-white justify-between px-12 w-full h-12 
     bg-secondary shadow border-b border-b-primary"
    >
      <Logo />
      <HamburgerMenuButton handleClick={handleClick} isOpen={isOpen} />
      <NavItems isOpen={isOpen} closeMenu={closeMenu} />
      <ThemeSwitcher />
    </div>
  );
}
