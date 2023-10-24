import Link from "next/link";

export default function SignUpButton() {
  return (
    <Link
      href="/kaydol"
      className="rounded-sm text-center fancy-button font-body md:w-1/4 mt-12 w-full border border-white py-2 font-bold text-white"
    >
      <span></span>
      Kaydol
      <span></span>
    </Link>
  );
}
