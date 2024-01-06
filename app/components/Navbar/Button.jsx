import LightButton from "../LightButton";

function PurpleIndicator() {
  return (
    <div className="rounded-full w-40 blur-[150px] aspect-square bg-accent-400 absolute -top-24 -right-24"></div>
  );
}

export function Button() {
  return (
    <div className="lg:flex relative hidden flex-1 justify-end">
      <div className="z-20">
        <LightButton
          href={"/oyla"}
          isFancy={true}
          text={"Şimdi Oyla"}
          imgSrc={"/star.png"}
          imgAlt={"Yıldız"}
        />
      </div>
      <PurpleIndicator />
    </div>
  );
}
