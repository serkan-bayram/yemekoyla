"use client";

export function HamburgerMenuButton({ isOpen, setIsOpen }) {
  const handleClick = () => {
    setIsOpen((prevValue) => !prevValue);
  };

  return (
    <button
      id="menu-button"
      onClick={handleClick}
      className={`lg:hidden z-50 
        before:my-1 before:block before:w-8 before:h-1 before:rounded-md before:bg-white 
        after:my-1 after:block after:w-8 after:h-1 after:rounded-md after:bg-white 
        before:transition-all after:transition-all
  ${isOpen ? "before:rotate-45 after:-rotate-45 before:translate-y-2 pb-2" : ""}
  `}
    >
      {!isOpen && <div className="w-8 h-1 rounded-md bg-white"></div>}
    </button>
  );
}
