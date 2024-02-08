import { UserRow } from "./UserRow";
import { v4 as uuidv4 } from "uuid";

export default function Users({ users }) {
  return (
    <div className="mt-8 lg:w-full lg:flex justify-center px-4 mb-4">
      <table className="border border-primary-100">
        <thead>
          <tr>
            <th>Kullanıcı ID</th>
            <th>Kullanıcı Adı</th>
            <th>Kullanıcı E-Posta</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow key={uuidv4()} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
