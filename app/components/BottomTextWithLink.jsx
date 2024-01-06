import TextWithLink from "./TextWithLink";

// TextWithLink but positioned on the bottom
export default function BottomTextWithLink({ linkText, href, text }) {
  return (
    <div className="">
      <TextWithLink linkText={linkText} href={href} text={text} />
    </div>
  );
}
