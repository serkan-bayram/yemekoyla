import Image from "next/image";
import Link from "next/link";

export default function Button({ text }) {
  return (
    <button className="mx-auto lg:mx-0 group w-fit text-accent-400 font-bold font-body text-lg ">
      <Link
        className="flex
       items-center gap-x-1"
        href="/oyla"
      >
        {text}
        <Image
          className="group-hover:translate-x-2 transition-all "
          src="/right-arrow.png"
          alt=""
          width={12}
          height={12}
        />
      </Link>
    </button>
  );
}
