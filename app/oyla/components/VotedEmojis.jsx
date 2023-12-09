"use client";

import { v4 as uuidv4 } from "uuid";
import { voteEmoji } from "./voteEmoji";
import { deleteEmoji } from "./deleteEmoji";
import { useState } from "react";

export default function VotedEmojis({
  ratingId,
  emojis,
  currentUser,
  setEmojis,
  adminEmojis,
}) {
  const info = emojis[0].info;

  const [mouseOver, setMouseOver] = useState(false);

  const handleClick = async (votedEmoji) => {
    info.forEach(async (inf) => {
      if (inf.emoji === votedEmoji) {
        if (inf.isPicked) {
          // Unpick if it's already picked
          inf.isPicked = false;
          inf.count -= 1;
          inf.username = inf.username.filter((usr) => usr != currentUser);
        } else {
          //  Pick the emoji
          inf.isPicked = true;
          inf.count += 1;
          inf.username.push(currentUser);
        }
      } else {
        if (inf.isPicked) {
          inf.isPicked = false;
          inf.count -= 1;
          inf.username = inf.username.filter((usr) => usr != currentUser);
        }
      }
    });

    const removeZeroCounts = info.filter((inf) => inf.count > 0);

    setEmojis([{ info: removeZeroCounts }]);

    // should we add emoji to db or should we delete emoji from db
    const isPicked = info.some((inf) => inf.isPicked);
    if (isPicked) {
      await voteEmoji(ratingId, votedEmoji);
    } else {
      await deleteEmoji(ratingId);
    }
  };

  return (
    <div className="">
      <ul className="flex gap-2">
        {info.map((inf) => {
          return (
            <li
              onMouseOver={() => {
                setMouseOver(inf.emoji);
              }}
              onMouseOut={() => {
                setMouseOver(false);
              }}
              key={uuidv4()}
              className={`
${
  inf.isPicked
    ? "bg-primary hover:bg-transparent border border-gray-700 hover:border-primary  "
    : "border border-primary hover:bg-primary hover:border-gray-700"
}
md:text-lg relative
rounded-full py-1 px-2`}
            >
              {mouseOver === inf.emoji && (
                <ul
                  className=" p-2 rounded-md text-sm
                 bg-black border text-center
                  font-heading border-primary shadow hidden lg:absolute lg:block
                  left-1/2
                  
                  -translate-x-1/2
                 w-fit  bottom-16"
                >
                  {inf.username.map((usr) => {
                    return <li key={uuidv4()}>{usr}</li>;
                  })}
                </ul>
              )}
              <button
                onClick={() => {
                  const isAdminEmoji = adminEmojis.some(
                    (emoji) => inf.emoji === emoji
                  );

                  if (!isAdminEmoji) handleClick(inf.emoji);
                }}
              >
                {inf.emoji} <span>{inf.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// info.map((inf) => {
//   console.log(inf);
//   if (inf.emoji === votedEmoji) {
//     // If the clicked emoji is picked we will decrease the count
//     // and change isPicked to apply style
//     if (inf.isPicked) {
//       return { ...inf, count: inf.count - 1, isPicked: false };
//     } else {
//       // If it is not picked before, we can increase the count
//       return {
//         ...inf,
//         count: inf.count + 1,
//         isPicked: true,
//       };
//     }
//   } else {
//     // For other emojis if they are not picked,
//     // we can just return the emojis as it is
//     // but if there is one picked
//     // we need to make it's isPicked false and decrase count
//     // because we are increasing another emojis's count
//     // there should be only one emoji picked
//     if (inf.isPicked) {
//       return { ...inf, count: inf.count - 1, isPicked: false };
//     } else {
//       return { ...inf };
//     }
//   }
// });

// let addOrDelete = null;
// const updatedEmojis = emojis.map((emoji) => {
//   const id = emoji.ratingId;
//   const info = emoji.info;

//   console.log(info);

//   if (id === votedRatingId) {
//     return {
//       ratingId: votedRatingId,
//       info: info.map((inf) => {
//         if (inf.emoji === votedEmoji) {
//           if (inf.isPicked) {
//             addOrDelete = "delete";
//             return {
//               emoji: votedEmoji,
//               count: inf.count - 1,
//               isPicked: false,
//               userId: inf.userId,
//             };
//           } else {
//             addOrDelete = "add";
//             return {
//               emoji: votedEmoji,
//               count: inf.count + 1,
//               isPicked: true,
//               userId: inf.userId,
//             };
//           }
//         } else {
//           if (inf.isPicked) {
//             return { ...inf, isPicked: false, count: inf.count - 1 };
//           } else {
//             return inf;
//           }
//         }
//       }),
//     };
//   } else {
//     return emoji;
//   }
// });

// const removeZeroCounts = updatedEmojis.filter((updatedEmoji) => {
//   if (updatedEmoji.ratingId === votedRatingId) {
//     const info = updatedEmoji.info;
//     return info.some((inf) => inf.count > 0);
//   } else {
//     return true;
//   }
// });

// setEmojis(removeZeroCounts);
