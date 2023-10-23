import Link from "next/link";
import ScrollIntoView from "react-scroll-into-view";
import { v4 as uuidv4 } from "uuid";

function UnderlinedText({ text }) {
  return (
    <button
      className="relative
after:transition-all after:duration-300
after:h-1 after:bg-white after:absolute after:left-0 after:bottom-0
after:scale-y-50 underlined-link"
    >
      <li>{text}</li>
    </button>
  );
}

function ScrollNavItem({ selector, text, closeMenu }) {
  return (
    <ScrollIntoView onClick={closeMenu} selector={selector}>
      <UnderlinedText text={text} />
    </ScrollIntoView>
  );
}

// TODO: there is a bug, it does not seem good
function LinkNavItem({ href, text, closeMenu }) {
  return (
    <Link onClick={closeMenu} href={href}>
      <UnderlinedText text={text} />
    </Link>
  );
}

// TODO: Change items according to path
export default function NavItems({ isOpen, closeMenu }) {
  const items = [
    { selector: "#home", text: "Ana Sayfa" },
    { selector: "#why", text: "Neden?" },
    { selector: "#how", text: "Nasıl?" },
    { href: "/anasayfa", text: "Oyla" },
    { selector: "#contact", text: "İletişim" },
  ];

  return (
    <ul
      className={`flex 
     lg:flex-row lg:items-center
     lg:static lg:h-full lg:bg-transparent 
     gap-12 font-body fixed right-0 
     flex-col justify-start pt-48 items-center
     top-12 h-screen w-full bg-secondary z-50
     transition-transform
     lg:translate-x-0 lg:pt-0 lg:justify-center
     lg:opacity-100
     
    ${isOpen ? "translate-x-0 opacity-100" : "opacity-0 translate-x-full"}
     `}
    >
      {items.map((item) => {
        if (item?.href) {
          return (
            <LinkNavItem
              key={uuidv4()}
              closeMenu={closeMenu}
              href={item.href}
              text={item.text}
            />
          );
        }
        return (
          <ScrollNavItem
            key={uuidv4()}
            closeMenu={closeMenu}
            selector={item.selector}
            text={item.text}
          />
        );
      })}
    </ul>
  );
}
