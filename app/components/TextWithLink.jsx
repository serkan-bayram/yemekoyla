import Link from "next/link";

export default function TextWithLink({ text, href, linkText }) {
  return (
    <div className="w-full text-sm text-fade-500">
      {text}{" "}
      <Link
        className="text-accent-400 font-semibold
         hover:text-accent-300 transition-all"
        href={href}
      >
        {linkText}
      </Link>
    </div>
  );
}
