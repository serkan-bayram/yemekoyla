export default function UserInfo({ username }) {
  return (
    <div className="font-heading flex justify-center text-white items-center gap-1 lg:pt-0 pt-8">
      Hoş geldin, {username}.
    </div>
  );
}
