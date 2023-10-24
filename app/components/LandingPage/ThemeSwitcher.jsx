import Image from "next/image";

export default function ThemeSwitcher({ isMobile = false }) {
  return (
    <button
      disabled
      className={`${
        isMobile ? "block" : "hidden"
      } disabled:grayscale lg:block cursor-not-allowed`}
    >
      <Image
        title="Yakında."
        src="/themeSwitcher.png"
        width={32}
        height={32}
        alt="Tema Değiştirici"
      />
    </button>
  );
}
