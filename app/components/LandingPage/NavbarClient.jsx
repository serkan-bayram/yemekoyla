"use client";

import HamburgerMenuButton from "./HamburgerMenuButton";
import NavItems from "./NavItems";
import disableScroll from "disable-scroll";
import { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavbarClient({ items }) {
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
    <>
      <HamburgerMenuButton handleClick={handleClick} isOpen={isOpen} />
      <NavItems items={items} isOpen={isOpen} closeMenu={closeMenu} />
      <ThemeSwitcher />
    </>
  );
}