import { useState } from "react";
import Image from "next/image";
import { AddGif } from "./AddGif";
import { GifPopup } from "./GifPopup";

export default function Gif({ setSelectedGif }) {
  const [isAddGif, setIsAddGif] = useState(false);
  const [gifs, setGifs] = useState([]);

  return (
    <div>
      <div className="relative font-body flex gap-2 items-center">
        <AddGif setIsAddGif={setIsAddGif} />
        <GifPopup
          setIsAddGif={setIsAddGif}
          isAddGif={isAddGif}
          setGifs={setGifs}
          setSelectedGif={setSelectedGif}
          gifs={gifs}
        />
      </div>
    </div>
  );
}
