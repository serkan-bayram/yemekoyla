import Image from "next/image";
import Link from "next/link";

// This is bad.
export function Logo() {
  return (
    <Link className="relative  w-full lg:w-auto" href="/">
      <Image
        className="lg:block hidden "
        width={120}
        height={120}
        src={"/mascot.png"}
      />
      <Image
        className="initial lg:hidden absolute top-1/2 -translate-y-1/2 -left-4"
        width={70}
        height={70}
        src={"/mascot.png"}
      />
      <h1
        className="text-accent-400 absolute left-1/2 -translate-x-1/2 -bottom-2  transition-all
  select-none font-heading font-extrabold lg:block hidden"
      >
        Yemekoyla
      </h1>
    </Link>
  );
}
