import Link from "next/link";

export default function TextWithLink({ text, href, linkText }) {
  return (
    <div className="w-full text-sm  text-center  text-gray-700 pt-6">
      {text}{" "}
      <Link
        className="text-gray-500 
      relative 
    after:transition-all after:duration-300
    after:h-1 after:bg-accent after:absolute after:left-0 after:-bottom-1
    after:scale-y-50 underlined-link
            "
        href={href}
      >
        {linkText}
      </Link>
    </div>
  );
}
