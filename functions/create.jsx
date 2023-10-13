import PocketBase from "pocketbase";

export async function create(rating) {
  const pb = new PocketBase("http://127.0.0.1:8090");

  // example create data
  const data = {
    rating: "test",
  };

  const record = await pb.collection("ratings").create(data);
}
