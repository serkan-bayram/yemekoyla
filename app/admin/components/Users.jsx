import { changePermission } from "../../components/Functions/actions";

export default function Users({ users }) {
  return (
    <div className="mt-8 lg:w-full lg:flex justify-center px-4">
      <table className="border">
        <th>Kullanıcı ID</th>
        <th>Kullanıcı Adı</th>
        <th>Kullanıcı E-Posta</th>
        {users.map((user) => (
          <tr className="border h-12">
            <td className="p-4">{user.id}</td>
            <td className="max-w-[16ch] p-4 overflow-hidden">
              {user.username}
            </td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">
              <form action={changePermission}>
                <button
                  type="submit"
                  className="bg-error p-2 rounded-md 
                font-body font-bold hover:opacity-50 transition-all"
                >
                  {user.permission !== "banned" ? "Banla" : "Banı Kaldır"}
                </button>
                <input type="hidden" name="userId" value={user.id} />
              </form>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
