import { v4 as uuidv4 } from "uuid";
import { SearchGif } from "./SearchGif";
import { Suspense } from "react";
import { CloseButton } from "./CloseButton";

export function GifPopup({
  gifs,
  setSelectedGif,
  isAddGif,
  setGifs,
  setIsAddGif,
}) {
  const isThereAnyGifs = gifs?.data?.length > 0;

  const handleClick = (gifUrl) => {
    setSelectedGif(gifUrl);
    setIsAddGif(false);
  };

  return (
    isAddGif && (
      <div
        className="absolute min-w-[250px] lg:min-w-[450px] bg-primary-300 shadow border
         border-fade-500
        rounded-md lg:top-12 lg:bottom-auto top-auto bottom-12  left-0  z-[100] max-h-96 overflow-y-auto 
       flex gap-4 flex-wrap justify-center"
      >
        <SearchGif
          setIsAddGif={setIsAddGif}
          isAddGif={isAddGif}
          setGifs={setGifs}
        />

        {!isThereAnyGifs ? (
          <div className="my-4">Gif</div>
        ) : (
          gifs.data.map((gif) => (
            <button
              type="button"
              onClick={() => handleClick(gif.images.fixed_height.webp)}
              key={uuidv4()}
            >
              <img
                src={gif.images.fixed_height.webp}
                width={200}
                height={200}
                alt="Gif"
              />
            </button>
          ))
        )}
      </div>
    )
  );
}
