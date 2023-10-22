import ScrollTarget from "./ScrollTarget";

export default function AccordionContent({ content, isOpen }) {
  return (
    <div
      className={`transition-all duration-300 grid ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <p
          className="tracking-wide leading-relaxed w-full 
    bg-primary font-body p-4 text-white rounded-md"
        >
          {content}
        </p>
      </div>
    </div>
  );
}
