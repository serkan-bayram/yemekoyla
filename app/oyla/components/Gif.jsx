import { useEffect, useState } from "react";
import { searchGif } from "../../components/Functions/searchGif";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

function CloseButton({ setState }) {
  return (
    <button
      onClick={() => {
        setState(false);
      }}
      type="button"
      className={`z-50 
        before:my-1 before:block before:w-6 before:h-1 before:rounded-md before:bg-white 
        after:my-1 after:block after:w-6 after:h-1 after:rounded-md after:bg-white 
        before:transition-all after:transition-all
        before:rotate-45 after:-rotate-45 before:translate-y-2 pb-2
        `}
    ></button>
  );
}

function AddGif({ setIsAddGif, setIsSearching }) {
  const handleClick = () => {
    setIsAddGif((prevValue) => !prevValue);
    setIsSearching((prevValue) => !prevValue);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="px-3 py-1 rounded-md  bg-transparent hover:bg-primary
       transition-all border font-body border-primary text-white"
    >
      GIF
    </button>
  );
}

function SearchGif({ isAddGif, setIsSearching, setGifs }) {
  const [inputValue, setInputValue] = useState("");

  // wait to fetch until user is stop typing
  useEffect(() => {
    const delay = 500; // Set the delay in milliseconds
    let timeoutId;

    const fetchData = async () => {
      const response = await searchGif(inputValue);

      if (response.ok) {
        setGifs(response.data);
      } else {
        setGifs([]);
      }
    };

    // Debounce function to delay API call
    const debounceFetchData = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchData, delay);
    };

    if (inputValue.trim() !== "") {
      debounceFetchData();
    } else {
      setGifs([]);
    }

    // Cleanup function to clear timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const handleChange = (e) => {
    const value = e.target.value;

    setIsSearching(value.length > 0);
    setInputValue(value);
  };

  return (
    isAddGif && (
      <input
        onFocus={() => setIsSearching(true)}
        onChange={handleChange}
        className="appearance-none w-full rounded-md border border-primary
       bg-transparent px-2 py-1 font-heading  "
        placeholder="Ara"
      />
    )
  );
}

function GifPopup({ gifs, isSearching, setSelectedGif, setIsSearching }) {
  const isThereAnyGifs = gifs?.data?.length > 0;

  const handleClick = (gifUrl) => {
    setSelectedGif(gifUrl);
    setIsSearching(false);
  };

  return (
    isSearching && (
      <div
        className="absolute w-full md:w-2/3 bg-primary border border-secondary
       p-2 rounded-md bottom-12 right-0 z-50 max-h-80 overflow-y-auto flex gap-4 flex-wrap"
      >
        {!isThereAnyGifs ? (
          <div>Gif Bulunamadı</div>
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

function SelectedGif({ selectedGif }) {
  return <img src={selectedGif} width={200} height={200} alt="Gif" />;
}

export default function Gif({ selectedGif, setSelectedGif }) {
  const [isAddGif, setIsAddGif] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [gifs, setGifs] = useState([]);

  return (
    <>
      <div className="relative mt-4 flex gap-2 items-center">
        <AddGif setIsAddGif={setIsAddGif} setIsSearching={setIsSearching} />
        <SearchGif
          isAddGif={isAddGif}
          setIsSearching={setIsSearching}
          setGifs={setGifs}
        />
        <GifPopup
          setSelectedGif={setSelectedGif}
          gifs={gifs}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </div>
      {selectedGif.length > 0 && (
        <div className="mt-6 w-fit">
          <div className="flex mb-1 justify-between items-center">
            <div className="font-body ">Seçilen Gif</div>
            <CloseButton setState={setSelectedGif} />
          </div>
          <SelectedGif selectedGif={selectedGif} />
        </div>
      )}
    </>
  );
}
