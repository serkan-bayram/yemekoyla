import Image from "next/image";
import Heading from "./Heading";
import Description from "./Description";
import Button from "./Button";
import { getMenu } from "../../../components/Functions/getMenu";
import { headers } from "next/headers";
import { getSession } from "../../../components/Functions/getSession";

export default async function Trip() {
  const { session } = await getSession();

  const headersList = headers();

  const isGuest = !!session ? true : headersList.get("is-guest");

  const menu = await getMenu();

  return (
    <div className="py-24">
      <div className="relative w-full   lg:px-24 ">
        <div className="z-10 relative flex justify-center lg:justify-between lg:mx-24 mx-12  ">
          <div className="flex z-[5] flex-col gap-8 py-8">
            <Heading title="Ben bi'" accent="gezineyim" />
            <Description content="Diyorsan eğer, hiç sorun değil! Eduroam ağına bağlanarak öğrenci olduğunu doğrulayabilir, içerde ne var ne yok bakabilirsin." />
            <div className={`${!!isGuest === false && "group relative"}`}>
              <div className={`${!!isGuest === false && "opacity-50"}`}>
                <Button href={!!isGuest ? `/oyla/${menu.date}` : "/oyla"} />
              </div>
              {!!isGuest === false && (
                <div
                  className="lg:hidden group-hover:block lg:absolute 
              top-12 left-0 lg:bg-black p-3 font-body mx-auto my-4
              rounded-md max-w-[45ch] text-sm 
              text-center lg:border border-fade-500"
                >
                  Eduroam ağına bağlı gözükmüyorsunuz, tekrar denemek için
                  sayfayı yenileyin.
                </div>
              )}
            </div>
          </div>
          <Image
            className="absolute z-[-1] -bottom-1 right-0 hidden lg:inline"
            src={"/man.svg"}
            width={407}
            height={416}
            alt=""
          />
        </div>
        <Image
          fill
          alt=""
          src="/blurry-background.png"
          className=" lg:px-24 px-4 "
        />
      </div>
    </div>
  );
}
