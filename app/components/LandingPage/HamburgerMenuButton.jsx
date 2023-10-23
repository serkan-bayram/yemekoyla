export default function HamburgerMenuButton({ handleClick, isOpen }) {
  return (
    <div onClick={handleClick} className="cursor-pointer">
      <button
        className={`lg:hidden relative flex items-center
    after:w-6 after:h-1 after:bg-white after:absolute
    before:w-6 before:h-1 before:bg-white before:absolute
    before:left-0
    after:left-0
    before:transition-all
    after:transition-all
    after:duration-300
    before:duration-300
    after:rounded-sm
    before:rounded-sm
  ${
    isOpen
      ? "after:rotate-45 after:bottom-0 before:-rotate-45 before:bottom-0"
      : "after:-top-2 before:top-2"
  }
  `}
      >
        <div
          className={`${
            isOpen ? "opacity-0" : ""
          } transition-none w-6 h-1 bg-white`}
        ></div>
      </button>
    </div>
  );
}
