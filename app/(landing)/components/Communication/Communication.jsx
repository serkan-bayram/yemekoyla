import { Comments } from "./Comments";
import TextReveal from "./TextReveal";
import { PurpleIndicator } from "./PurpleIndicator";

export default function Communication() {
  return (
    <div className="flex relative flex-col items-center lg:py-72 py-16 ">
      <div className="mx-auto lg:px-8 max-w-7xl px-4 ">
        <TextReveal />
      </div>
      <Comments />
      <PurpleIndicator />
    </div>
  );
}
