import Link from "next/link";

export default function AltText({ text, href, linkText }) {
  return (
    <div className="w-full text-md text-center  text-gray-700 pt-6">
      {text}{" "}
      <Link
        className="text-gray-500 
      relative ml-1
    after:transition-all after:duration-300
    after:h-1 after:bg-white after:absolute after:left-0 after:-bottom-[3px]
    after:scale-y-50 underlined-link
            "
        href={href}
      >
        {linkText}
      </Link>
    </div>
  );
}
