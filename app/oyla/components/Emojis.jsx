"use client";

import { useEffect, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import VotedEmojis, { VotedEmojisGuest } from "./VotedEmojis";

export function EmojisGuest({ votedEmojis, ratingId }) {
  useEffect(() => {
    // we delete ratingId because we don't need it anymore
    votedEmojis.forEach((emoji) => {
      delete emoji.ratingId;
    });
  }, []);

  const [emojis, setEmojis] = useState(votedEmojis);

  return (
    <div className="flex flex-wrap items-center mt-4 gap-2">
      <VotedEmojisGuest emojis={emojis} />
    </div>
  );
}

export default function Emojis({
  emojisArray,
  currentUser,
  ratingId,
  votedEmojis,
  adminEmojis,
}) {
  useEffect(() => {
    // we delete ratingId because we don't need it anymore
    votedEmojis.forEach((emoji) => {
      delete emoji.ratingId;
    });
  }, []);

  const [emojis, setEmojis] = useState(votedEmojis);

  return (
    <div className="flex flex-wrap items-center mt-4 gap-2">
      <EmojiPicker
        emojisArray={emojisArray}
        currentUser={currentUser}
        ratingId={ratingId}
        votedEmojis={votedEmojis}
        emojis={emojis}
        setEmojis={setEmojis}
      />
      <VotedEmojis
        adminEmojis={adminEmojis}
        currentUser={currentUser}
        ratingId={ratingId}
        votedEmojis={votedEmojis}
        emojis={emojis}
        setEmojis={setEmojis}
      />
    </div>
  );
}
