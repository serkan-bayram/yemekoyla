import { getSession } from "../../components/Functions/getSession";

export const getEmojis = async (pb) => {
  try {
    const records = await pb
      .collection("emojis")
      .getFullList({ expand: "userId" });

    const array = records.map((record) => {
      return {
        ratingId: record.ratingId,
        info: {
          emoji: record.emoji,
          username: [record.expand.userId.username],
          isPicked: false,
        },
      };
    });

    // Merge infos with the same ratingId
    const mergedInfosByRatingId = [];

    array.forEach((item) => {
      const isItemAdded = mergedInfosByRatingId.some(
        (updatedItem) => item.ratingId === updatedItem.ratingId
      );
      if (isItemAdded) {
        mergedInfosByRatingId.forEach((updatedItem) => {
          if (updatedItem.ratingId === item.ratingId) {
            const updatedInfo = [];
            if (Array.isArray(updatedItem.info)) {
              updatedItem.info.forEach((info) => {
                updatedInfo.push(info);
              });
            } else {
              updatedInfo.push(updatedItem.info);
            }
            updatedInfo.push(item.info);
            updatedItem.info = updatedInfo;
          }
        });
      } else {
        item.info = [item.info];
        mergedInfosByRatingId.push(item);
      }
    });

    // Merge infos with the same emoji

    // console.log(mergedInfosByRatingId[0]);

    const mergedInfosByEmoji = [];

    mergedInfosByRatingId.forEach((item) => {
      const info = item.info;
      const updatedInfo = [];

      info.forEach((inf) => {
        const isEmojiAdded = updatedInfo.some(
          (updatedItem) => updatedItem.emoji === inf.emoji
        );

        if (isEmojiAdded) {
          updatedInfo.forEach((updatedItem) => {
            if (updatedItem.emoji === inf.emoji) {
              const updatedUsername = [];
              updatedItem.username.forEach((id) => {
                updatedUsername.push(id);
              });

              inf.username.forEach((id) => {
                updatedUsername.push(id);
              });

              updatedItem.username = updatedUsername;
            }
          });
        } else {
          updatedInfo.push(inf);
        }
      });

      mergedInfosByEmoji.push({ ratingId: item.ratingId, info: updatedInfo });
    });

    // determine isPicked and count

    const { session } = await getSession();

    const sessionUsername = session.user.record.username;

    mergedInfosByEmoji.forEach((item) => {
      const info = item.info;
      info.forEach((inf) => {
        const username = inf.username;

        const isPicked = username.some((usr) => usr === sessionUsername);

        inf.isPicked = isPicked;
        inf.count = username.length;
      });
    });

    return mergedInfosByEmoji;
  } catch (error) {
    console.log("Error on getemojis: ", error);
  }
};
