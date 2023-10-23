import Image from "next/image";

export default function ThemeSwitcher({ isMobile = false }) {
  return (
    <button
      className={`${isMobile ? "block" : "hidden"} lg:block cursor-not-allowed`}
      disabled
    >
      <Image
        src="/themeSwitcher.png"
        width={32}
        height={32}
        alt="Tema Değiştirici"
      />
    </button>
  );
}
