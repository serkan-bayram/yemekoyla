export default function UnderlinedText({ text }) {
  return (
    <button
      className="relative
    after:transition-all after:duration-300
    after:h-1 after:bg-accent after:absolute after:left-0 after:bottom-0
    after:scale-y-50 underlined-link"
    >
      {text}
    </button>
  );
}
