import Image from "next/image";
import ImageInfo from "./ImageInfo";

export default function Food() {
  return (
    <div className="flex flex-col items-center pt-8 gap-6">
      <div className="w-64 md:w-96 aspect-square flex items-center justify-center relative">
        <Image
          src="/food.jpeg"
          fill={true}
          alt="Bugünün yemeği."
          priority={true}
        />
      </div>
      <ImageInfo />
    </div>
  );
}
