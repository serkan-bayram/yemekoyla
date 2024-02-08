import { changePermission } from "../../components/Functions/actions";

export function UserRow({ user }) {
  const { id, username, email, permission } = user;

  return (
    <tr className="border h-12 border-primary-100">
      <td className="p-8">{id}</td>
      <td className="max-w-[16ch] p-8 overflow-hidden">{username}</td>
      <td className="p-8">{email}</td>
      <td className="p-8">
        <form action={changePermission}>
          <button
            type="submit"
            className="bg-error p-2 rounded-md 
      font-body font-bold hover:opacity-50 transition-all"
          >
            {permission !== "banned" ? "Banla" : "Banı Kaldır"}
          </button>
          <input type="hidden" name="userId" value={id} />
        </form>
      </td>
    </tr>
  );
}
