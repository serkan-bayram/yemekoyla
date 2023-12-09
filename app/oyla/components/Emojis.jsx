"use client";

import { useEffect, useState } from "react";
import EmojiPicker from "./EmojiPicker";
import VotedEmojis from "./VotedEmojis";

export default function Emojis({ currentUser, ratingId, votedEmojis }) {
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
        currentUser={currentUser}
        ratingId={ratingId}
        votedEmojis={votedEmojis}
        emojis={emojis}
        setEmojis={setEmojis}
      />
      <VotedEmojis
        currentUser={currentUser}
        ratingId={ratingId}
        votedEmojis={votedEmojis}
        emojis={emojis}
        setEmojis={setEmojis}
      />
    </div>
  );
}
