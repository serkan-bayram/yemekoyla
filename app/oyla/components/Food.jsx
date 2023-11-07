import Image from "next/image";
import ImageInfo from "./ImageInfo";

// aspect-[1024/768]

export default async function Food() {
  const src = await getMenuURL();

  return (
    <div className="flex flex-col items-center pt-8 gap-6">
      <div className="w-64 md:w-[30rem] aspect-[1024/768] flex items-center justify-center relative">
        <Image
          src={src}
          fill={true}
          sizes="30vw"
          alt="Bugünün yemeği."
          priority={true}
        />
      </div>
      <ImageInfo />
    </div>
  );
}
