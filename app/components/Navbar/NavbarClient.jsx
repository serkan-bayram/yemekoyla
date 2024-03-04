"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { HamburgerMenuButton } from "./HamburgerMenuButton";
import { Items } from "./Items";
import { Logo } from "./Logo";
import Image from "next/image";

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
      className="fixed w-full lg:w-auto lg:static z-50 top-0 
      border-b lg:border-0
       border-b-primary-100
           flex
     items-center justify-between px-4 lg:px-24 lg:h-24 h-16
      bg-primary-300 "
    >
      <div className="flex flex-1 h-full lg:h-auto">
        <Logo />
      </div>
      <Items isOpen={isOpen} setIsOpen={setIsOpen} navigation={navigation} />
      <Button />
      <HamburgerMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
