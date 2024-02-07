import pb from "./authAsAdmin";
import { getSession } from "./getSession";

export async function getAvatar() {
  const { session } = await getSession();

  try {
    const url = pb.files.getUrl(
      session.user.record,
      session.user.record.avatar
    );

    if (url.length <= 0) return null;

    return url;
  } catch (error) {
    console.log("error on getAvatar: ", error);
  }
}
