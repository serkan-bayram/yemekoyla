import pb from "../authAsAdmin";
import { getMenu } from "../getMenu";

export const bindMenuWithPoll = async (response) => {
  const menu = await getMenu();

  const data = {
    pollId: response.pollId,
  };

  const record = await pb.collection("menus").update(menu.id, data);
};
