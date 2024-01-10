import { useEffect, useState } from "react";
import { searchGif } from "../../../components/Functions/searchGif";
import { CloseButton } from "./CloseButton";

export function SearchGif({ setGifs, isAddGif, setIsAddGif }) {
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

  // Reset input every time GIF button is clicked
  useEffect(() => {
    setInputValue("");
  }, [isAddGif]);

  const handleChange = (e) => {
    const value = e.target.value;

    setInputValue(value);
  };

  return (
    <div className="flex sticky bg-black top-0 w-full gap-x-4 px-3 py-2 rounded-md">
      <CloseButton setState={setIsAddGif} />
      <input
        onChange={handleChange}
        className=" bg-primary-400
       appearance-none w-full rounded-md border 
        border-primary-100
       px-3 py-2 font-body  "
        placeholder="Gif ara"
      />
    </div>
  );
}
