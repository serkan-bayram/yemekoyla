import Link from "next/link";

export function Day({ menu }) {
  const day = menu.date.split("-")[0];
  const fullDate = menu.date;

  return (
    <Link
      target="_blank"
      href={`/oyla/${fullDate}`}
      className="flex flex-col text-center gap-2 border
   border-primary-100 hover:bg-accent-400 
   transition-all cursor-pointer duration-300 w-fit lg:p-8 p-6 rounded-md"
    >
      <div className="font-heading font-semibold text-4xl">{day}</div>
      <div className="font-body mt-1 text-sm">{fullDate}</div>
    </Link>
  );
}
