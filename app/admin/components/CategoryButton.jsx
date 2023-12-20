export default function CategoryButton({ setOption, text, name }) {
  const handleClick = () => {
    setOption(name);
  };

  return (
    <button
      onClick={handleClick}
      className="font-body bg-secondary border 
    border-primary p-1 px-3 rounded-md  hover:bg-background hover:border-primary hover:border-2 transition-all"
    >
      {text}
    </button>
  );
}
