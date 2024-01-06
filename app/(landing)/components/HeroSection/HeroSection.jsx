import LightButton from "../../../components/LightButton";
import DarkButton from "../../../components/DarkButton";
import { Heading } from "./Heading";
import { Description } from "./Description";

export default function HeroSection() {
  return (
    <div className="lg:pt-48 lg:pb-36 py-16">
      <div className=" mx-auto lg:px-8 max-w-7xl px-4 text-center">
        <Heading />
        <Description />
        <div className="mt-12 flex justify-center gap-8 animate-translate-up">
          <LightButton
            href={"/oyla"}
            isFancy={true}
            text={"Şimdi Oyla"}
            imgSrc={"/star.png"}
            imgAlt={"Yıldız"}
          />
          <DarkButton selector={"#how"} />
        </div>
      </div>
    </div>
  );
}
