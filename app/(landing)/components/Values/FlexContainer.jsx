import Heading from "./Heading";
import Description from "./Description";
import Button from "./Button";
import ImageContainer from "./ImageContainer";

export default function FlexContainer({
  isReverse = false,
  title,
  accent,
  content,
  buttonText,
  imageSrc,
  imageAlt,
}) {
  return (
    <div className="flex lg:flex-row flex-col justify-between items-center gap-4 lg:gap-0   ">
      <div className="flex flex-col gap-5">
        <Heading title={title} accent={accent} />
        <Description content={content} />
        <Button text={buttonText} />
      </div>
      <ImageContainer
        isReverse={isReverse}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
      />
    </div>
  );
}
