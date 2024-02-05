import pb from "./authAsAdmin";
import { getSession } from "./getSession";

export async function getUserComments() {
  const { session } = await getSession();

  const userId = session.user.record.id;

  const records = await pb.collection("ratings").getFullList({
    sort: "-created",
    filter: `user.id="${userId}"`,
  });

  return records;
}
