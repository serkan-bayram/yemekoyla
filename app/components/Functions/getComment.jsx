import { authAsAdmin } from "../Functions/authAsAdmin";

export async function getComment(userId) {
  try {
    const pb = await authAsAdmin();

    const record = await pb
      .collection("ratings")
      .getFirstListItem(`user.id="${userId}"`, { next: { tags: ["comment"] } });

    if (!!record?.comment && record.comment.length > 0) {
      return { ok: true, comment: record.comment };
    }

    return { ok: false };

    // return menu;
  } catch (error) {
    console.log("Can't get user comment.", error);
    return null;
  }
}
