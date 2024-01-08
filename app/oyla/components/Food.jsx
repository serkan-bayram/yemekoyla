import ImageInfo from "./ImageInfo";
import Image from "next/image";

// aspect-[1024/768]

export default async function Food({ menu }) {
  const src = menu.url;
  const menuDate = menu.date;
  const menuArray = JSON.parse(menu.menu);

  console.log("img source: ", src);

  return (
    <div className="flex flex-col items-center  gap-6">
      <div className="w-64 md:w-[20rem] border shadow border-primary aspect-[1024/768] flex items-center justify-center relative">
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
      <ImageInfo menuDate={menuDate} menu={menuArray} />
    </div>
  );
}
