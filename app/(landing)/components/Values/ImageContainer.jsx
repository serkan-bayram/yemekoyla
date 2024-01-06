import Image from "next/image";

export default function ImageContainer({ imageSrc, imageAlt, isReverse }) {
  return (
    <div
      className={`${
        isReverse ? "lg:-order-1" : "lg:order-1"
      } -order-1 relative w-48 h-48 lg:w-[300px] lg:h-[300px] `}
    >
      <Image fill src={imageSrc} alt={imageAlt} />
    </div>
  );
}
