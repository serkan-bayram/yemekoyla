import TextWithLink from "./TextWithLink";

// TextWithLink but positioned on the bottom
export default function BottomTextWithLink({ linkText, href, text }) {
  return (
    <div className="absolute bottom-8 left-5 right-5">
      <TextWithLink linkText={linkText} href={href} text={text} />
    </div>
  );
}
