"use client";

import { usePathname } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import ScrollIntoView from "react-scroll-into-view";
import Link from "next/link";
import LightButton from "../LightButton";

function Text({ text }) {
  return (
    <div
      className=" lg:p-2 lg:px-3 rounded-md lg:hover:bg-primary-400
     cursor-pointer text-md"
    >
      {text}
    </div>
  );
}

// Let's you scroll to an element
function ScrollNavItem({ selector, text, setIsOpen }) {
  return (
    <li>
      <ScrollIntoView onClick={() => setIsOpen(false)} selector={selector}>
        <Text text={text} />
      </ScrollIntoView>
    </li>
  );
}

// Link to a page
function LinkNavItem({ href, text, setIsOpen }) {
  return (
    <li>
      <Link onClick={() => setIsOpen(false)} href={href}>
        <Text text={text} />
      </Link>
    </li>
  );
}

function ItemsByPath({ navigation, setIsOpen }) {
  let currentPathname = usePathname();

  // "/oyla" is a special path and it can have extra parameters like date
  // so we extract them for it to work correctly with our navbar setup
  if (currentPathname.startsWith("/oyla")) {
    const index = currentPathname.indexOf("/oyla");

    currentPathname = currentPathname.substring(0, index + "/oyla".length);
  }

  return navigation.map((item) => {
    const { pathname, links } = item;
    // Pathname -> in which paths should we render this item
    // Links can contain two things -> href or selector
    // if it has selector -> render ScrollIntoView
    // if it has href -> render Link

    // if pathname includes currentPathname we are rendering correct navs
    return (
      pathname.includes(currentPathname) &&
      links.map((link) => {
        return link?.href ? (
          <LinkNavItem
            key={uuidv4()}
            setIsOpen={setIsOpen}
            href={link.href}
            text={link.text}
          />
        ) : (
          <ScrollNavItem
            key={uuidv4()}
            setIsOpen={setIsOpen}
            selector={link.selector}
            text={link.text}
          />
        );
      })
    );
  });
}

export function Items({ isOpen, navigation, setIsOpen }) {
  // if (typeof window !== "undefined") {
  //   window.addEventListener("click", (e) => {
  //     const id = e.target.id;

  //     if (!id.startsWith("menu")) {
  //       setIsOpen(false);
  //     }
  //   });
  // }

  return (
    <>
      <ul className="hidden lg:flex gap-x-12 font-heading">
        <ItemsByPath setIsOpen={setIsOpen} navigation={navigation} />
      </ul>
      <div
        id="menu"
        className={` lg:hidden py-4 
          bg-primary-400/80  w-screen h-screen
          backdrop-blur-md
        
           fixed top-16 left-0 z-50
           font-body
           text-xl font-semibold
           transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 -translate-x-full"} 
          `}
      >
        <ul className="flex flex-col gap-12 px-4 ">
          <ItemsByPath setIsOpen={setIsOpen} navigation={navigation} />
          <li className="">
            <LightButton
              href={"/oyla"}
              isFancy={true}
              text={"Şimdi Oyla"}
              imgSrc={"/star.png"}
              imgAlt={"Yıldız"}
              handleClick={() => setIsOpen(false)}
            />
          </li>
        </ul>
      </div>
    </>
  );
}
