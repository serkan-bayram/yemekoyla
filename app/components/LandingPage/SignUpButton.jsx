import Link from "next/link";

export default function SignUpButton({ href, text }) {
  return (
    <Link
      href={href}
      className="rounded-md text-center fancy-button font-body md:w-1/4 mt-12 w-full border border-white py-2 font-bold text-white"
    >
      <span></span>
      {text}
      <span></span>
    </Link>
  );
}
