import { Icon } from "../../components/Input/Icon";
import Button from "./Button";

export default function ButtonGroup({ setDashboard }) {
  const handleClick = (state) => {
    setDashboard(state);
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <Button
        iconName={"fa-solid fa-gear"}
        onClick={() => handleClick("settings")}
        text="Ayarlarım"
      />
      <Button
        iconName="fa-solid fa-comment"
        onClick={() => handleClick("comments")}
        text="Geçmiş Yorumlarım"
      />
    </div>
  );
}
