import Link from "next/link";
import ScrollIntoView from "react-scroll-into-view";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import NavbarButton from "./NavbarButton";
import UnderlinedText from "../UnderlinedText";

// Let's you scroll to an element
function ScrollNavItem({ selector, text, closeMenu }) {
  return (
    <li>
      <ScrollIntoView onClick={closeMenu} selector={selector}>
        <UnderlinedText text={text} />
      </ScrollIntoView>
    </li>
  );
}

// Link to a page
function LinkNavItem({ href, text, closeMenu }) {
  return (
    <li>
      <Link onClick={closeMenu} href={href}>
        <UnderlinedText text={text} />
      </Link>
    </li>
  );
}

export default function NavbarItems({ isOpen, closeMenu, navigation, state }) {
  const currentPathname = usePathname();

  return (
    <ul
      className={`flex 
     lg:flex-row lg:items-center 
     lg:static lg:h-full lg:bg-transparent 
     gap-12 font-body fixed right-0 
     flex-col justify-center items-center
     top-12 h-[100dvh] w-full bg-secondary z-50
     transition-transform
     lg:translate-x-0 lg:pt-0 lg:justify-center
     lg:opacity-100
     
     
    ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 translate-x-full"}
     `}
    >
      {navigation.map((item) => {
        // pathname includes paths like /, /oyla, /giris
        // we render specific links according to these paths
        const { pathname, links } = item;
        {
          /* link?.href -> If a item has href that means it's going to link somewhere 
          so we render LinkNavItem */
        }
        return (
          pathname.includes(currentPathname) &&
          links.map((link) => {
            return link?.href ? (
              <LinkNavItem
                key={uuidv4()}
                closeMenu={closeMenu}
                href={link.href}
                text={link.text}
              />
            ) : (
              <ScrollNavItem
                key={uuidv4()}
                closeMenu={closeMenu}
                selector={link.selector}
                text={link.text}
              />
            );
          })
        );
      })}
      <li className="lg:absolute right-0">
        <NavbarButton
          closeMenu={closeMenu}
          state={state}
          pathname={currentPathname}
        />
      </li>
      <li></li>
    </ul>
  );
}
