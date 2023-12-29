"use client";

import HamburgerMenuButton from "./HamburgerMenuButton";
import NavbarItems from "./NavbarItems";
import disableScroll from "disable-scroll";
import { useEffect, useState } from "react";

// Most of the client side code of Navbar is here
export default function NavbarClient({ navigation, state }) {
  // Is menu open
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  // When we need to close menu programatically
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <HamburgerMenuButton handleClick={handleClick} isOpen={isOpen} />
      <NavbarItems
        navigation={navigation}
        isOpen={isOpen}
        closeMenu={closeMenu}
        state={state}
      />
    </>
  );
}
