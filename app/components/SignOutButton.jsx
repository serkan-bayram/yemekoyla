import serverSideSignOut from "./serverSideSignOut";

export default function SignOutButton() {
  return (
    <form action={serverSideSignOut}>
      <button
        className="text-gray-500 w-full mt-8
relative 
after:transition-all after:duration-300
after:h-1 after:bg-accent after:absolute after:left-0 after:-bottom-1
after:scale-y-50 underlined-link"
        type="submit"
      >
        Çıkış Yap.
      </button>
    </form>
  );
}
