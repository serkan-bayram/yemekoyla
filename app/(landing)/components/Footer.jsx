import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex justify-between items-center mx-4 lg:mx-24 py-8 ">
      <div className="font-heading">© {currentYear} Yemekoyla</div>
      <a href="mailto:serkanbayramdesign@gmail.com" title="İletişim">
        <Image src="/mail.svg" alt="E-Posta" width={25} height={25} />
      </a>
    </div>
  );
}
