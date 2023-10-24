import Button from "./Button";
import Loading from "./LoadingButton";

export default function SubmitButtonWithLoading({ isLoading, text }) {
  return isLoading ? <Loading /> : <Button text={text} />;
}
