export function AddGif({ setIsAddGif }) {
  const handleClick = () => {
    setIsAddGif((prevValue) => !prevValue);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="px-5 py-2 rounded-md  bg-transparent hover:bg-primary-100
       transition-all border font-body border-primary-100 text-white"
    >
      GIF
    </button>
  );
}
