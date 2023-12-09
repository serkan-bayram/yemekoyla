"use client";

import { useState } from "react";
import { voteEmoji } from "./voteEmoji";
import { deleteEmoji } from "./deleteEmoji";
import { v4 as uuidv4 } from "uuid";

export default function EmojiPicker({
  currentUser,
  ratingId,
  emojis,
  setEmojis,
}) {
  const info = emojis[0].info;

  const emojisArray = ["❤", "😂", "😔", "😡", "🤗"];

  const [mouseOver, setMouseOver] = useState(false);

  const handleMouseOver = () => {
    setMouseOver(true);
  };

  const handleMouseLeave = () => {
    setMouseOver(false);
  };

  const handleClick = async (votedEmoji) => {
    const isIncludes = info.some((inf) => votedEmoji === inf.emoji);
    window;

    if (!isIncludes) {
      info.forEach((inf) => {
        if (inf.isPicked) {
          inf.isPicked = false;
          inf.count -= 1;
          inf.username = inf.username.filter((usr) => usr != currentUser);
        }
      });

      info.push({
        emoji: votedEmoji,
        isPicked: true,
        count: 1,
        username: [currentUser],
      });
    } else {
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
    }

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

  window.addEventListener("click", (e) => {
    const id = e.target.id;

    if (!id.startsWith("emoji-picker")) {
      handleMouseLeave();
    }
  });

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      id="emoji-picker"
      className=" relative w-fit py-1 px-2  rounded-full  border border-primary bg-background"
    >
      <ul
        id="emoji-picker-ul"
        className="h-full flex justify-center items-center gap-4 md:text-lg"
      >
        {mouseOver ? (
          emojisArray.map((emoji) => {
            return (
              <li id="emoji-picker-li" key={uuidv4()}>
                <button
                  id="emoji-picker-button"
                  onClick={() => {
                    handleClick(emoji);
                  }}
                >
                  {emoji}
                </button>
              </li>
            );
          })
        ) : (
          <li id="emoji-picker-li">
            <button id="emoji-picker-button">{emojisArray[0]}</button>
          </li>
        )}
      </ul>
    </div>
  );
}
