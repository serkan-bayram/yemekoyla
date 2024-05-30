import Image from "next/image";
import pb from "../../../components/Functions/authAsAdmin";
import { v4 as uuidv4 } from "uuid";

export default async function TopList() {
  const allRatings = await pb
    .collection("ratings")
    .getFullList({ expand: "user" });

  const ratingCounts = [];

  allRatings.forEach((rating) => {
    // Did we add this person to ratingCounts?
    const isAdded = ratingCounts.filter(
      (ratingCount) => rating.user === ratingCount.user
    ).length;

    if (isAdded > 0) {
      // Find that person in ratingCounts and add +1 to count
      ratingCounts.forEach((ratingCount) => {
        if (ratingCount.user === rating.user) {
          const url = pb.files.getUrl(
            rating.expand.user,
            rating.expand.user.avatar
          );

          if (url.length > 0) {
            ratingCount.avatar = url;
          }

          ratingCount.count += 1;

          if (rating.comment.length > 0) {
            ratingCount.commentCount += 1;
            ratingCount.commentLength += rating.comment.length;
          }
        }
      });
    } else {
      if (!rating.user) return;

      // Add that person to ratingCounts
      ratingCounts.push({
        user: rating.user,
        count: 0,
        commentCount: 0,
        commentLength: 0,
        username: rating.expand?.user.username,
        avatar: null,
      });
    }
  });

  const sortedRatingCounts = ratingCounts.sort((a, b) => b.count - a.count);

  return (
    <div className="flex flex-col  items-center py-24 lg:mx-24 mx-4">
      <h4 className="lg:text-5xl text-4xl font-semibold  font-heading">
        Onur Listesi
      </h4>
      <div
        className="mt-16 flex overflow-x-auto w-full  
      gap-x-16 items-end border border-primary-100 rounded-md  h-full p-20"
      >
        {sortedRatingCounts.map((winners, index) => {
          if (index > 4) return;

          const heights = ["h-96", "h-72", "h-60", "h-52", "h-40"];
          const colors = [
            "bg-accent-300",
            "bg-accent-400",
            "bg-[#5C5C8C]",
            "bg-[#4B4B7A]",
            "bg-[#4D4D72]",
          ];

          return (
            <div
              key={uuidv4()}
              className={`${heights[index]} 
                relative flex flex-col lg:w-48 min-w-[10rem] ${colors[index]}`}
            >
              <div
                className="flex  items-center justify-center w-24 h-24
                 absolute 
                  left-1/2 -translate-x-1/2  -top-16  "
              >
                {winners?.avatar ? (
                  <Image
                    className="rounded-full object-fit 
                    "
                    src={winners.avatar}
                    fill
                    alt="Kullanıcı Avatarı"
                  />
                ) : (
                  <div className="text-2xl whitespace-nowrap font-bold">
                    Avatar Yok
                  </div>
                )}
              </div>
              <div
                className="flex flex-col
               w-full h-full border pt-12 px-2 justify-start items-center"
              >
                <div className="text-center mb-2">{winners.username}</div>
                <div>
                  <span className="font-bold">{winners.count}</span> oylama
                </div>
                <div>
                  <span className="font-bold">{winners.commentCount}</span>{" "}
                  yorum
                </div>
                <div>
                  <span className="font-bold">{winners.commentLength}</span>{" "}
                  harf
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <h4 className="lg:text-xl  opacity-50 mt-8  text-xl font-semibold  self-end font-heading">
        Teşekkürler 🤝
      </h4>
    </div>
  );
}
