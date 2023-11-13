export default function UserInfo({ username }) {
  return (
    <div
      className="font-heading mb-4
    flex justify-center text-white items-center lg:pt-8 pt-8"
    >
      Hoş geldin, {username}.
    </div>
  );
}
