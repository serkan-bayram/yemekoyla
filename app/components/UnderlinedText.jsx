export default function UnderlinedText({ text }) {
  return (
    <button
      className={`relative
    after:transition-all after:duration-300
    after:h-1 after:bg-accent after:absolute after:bottom-0
    after:scale-y-75  
    hover:after:left-0 hover:after:w-full
    after:right-0 after:w-0
    `}
    >
      {text}
    </button>
  );
}
