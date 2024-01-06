"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { HamburgerMenuButton } from "./HamburgerMenuButton";
import { Items } from "./Items";
import { Logo } from "./Logo";

export default function NavbarClient({ navigation }) {
  // Check is hamburger menu open
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
    <header
      className="fixed w-full lg:w-auto lg:static z-50 top-0 border-b lg:border-0
       border-b-primary
           flex
     items-center justify-between px-4 lg:px-24 h-16 bg-primary-300 "
    >
      <Logo />
      <Items isOpen={isOpen} setIsOpen={setIsOpen} navigation={navigation} />
      <Button />
      <HamburgerMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
