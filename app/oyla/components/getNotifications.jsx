import pb from "../../components/Functions/authAsAdmin";

export async function getNotifications() {
  const notifications = [];

  try {
    // TODO: filter by expired_at in query maybe?
    const records = await pb.collection("announcements").getFullList({
      sort: "-created",
    });

    records.forEach((record) => {
      // Şu anki tarih ve saat
      const now = new Date();

      const expirationDate = new Date(record.expires_at);

      // Karşılaştırma: expires_at tarihi şu andan sonra mı?
      const isExpired = now >= expirationDate;

      if (isExpired) return;

      notifications.push({
        id: record.id,
        title: record.title,
        content: record.announcement,
      });
    });
  } catch (error) {
    console.log(error);
    return null;
  }

  return notifications;
}
