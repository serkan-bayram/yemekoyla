import ImageInfo from "./ImageInfo";
import { getMenuURL } from "../../components/Functions/getMenuURL";
import Image from "next/image";

// aspect-[1024/768]

export default async function Food() {
  const src = await getMenuURL();

  return (
    <div className="flex flex-col items-center pt-8 gap-6">
      <div className="w-64 md:w-[30rem] border shadow border-primary aspect-[1024/768] flex items-center justify-center relative">
        {!!src ? (
          <Image
            src={src}
            fill={true}
            sizes="30vw"
            alt="Bugünün yemeği."
            priority={true}
          />
        ) : (
          <div className="border-2 shadow border-primary w-full h-full flex justify-center items-center">
            Fotoğraf Bulunamadı
          </div>
        )}
      </div>
      <ImageInfo />
    </div>
  );
}
