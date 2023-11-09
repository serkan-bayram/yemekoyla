export async function getRating(userId) {
  try {
    const pb = await authAsAdmin();

    const record = await pb
      .collection("ratings")
      .getFirstListItem(`user.id="${userId}"`, {
        next: { tags: ["tag"] },
      });

    if (!!record?.rating) {
      return { ok: true, rating: record.rating };
    }

    return { ok: false };

    // return menu;
  } catch (error) {
    console.log("Can't get user rating.", error);
    return null;
  }
}
