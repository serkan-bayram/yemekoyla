import Image from "next/image";
import Heading from "./Heading";
import Description from "./Description";
import Button from "./Button";

export default function Trip() {
  return (
    <div className="py-24">
      <div className="relative w-full   lg:px-24 ">
        <div className="z-10 relative flex justify-center lg:justify-between lg:mx-24 mx-12  ">
          <div className="flex z-[5] flex-col gap-8 py-8">
            <Heading title="Ben bi'" accent="gezineyim" />
            <Description content="Diyorsan eğer, hiç sorun değil! Eduroam ağına bağlanarak öğrenci olduğunu doğrulayabilir, içerde ne var ne yok bakabilirsin." />
            <Button />
          </div>
          <Image
            className="absolute z-[-1] -bottom-1 right-0 hidden lg:inline"
            src={"/man.svg"}
            width={407}
            height={416}
          />
        </div>
        <Image fill src="/blurry-background.png" className=" lg:px-24 px-4 " />
      </div>
    </div>
  );
}
