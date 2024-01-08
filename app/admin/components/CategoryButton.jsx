export default function CategoryButton({ setOption, text, name }) {
  const handleClick = () => {
    setOption(name);
  };

  return (
    <button
      onClick={handleClick}
      className="font-body bg-primary-400 border 
    border-primary-100 p-1 px-3 rounded-md  hover:bg-primary-400
     hover:border-primary-100
     hover:border-2 transition-all"
    >
      {text}
    </button>
  );
}
