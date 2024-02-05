import { v4 as uuidv4 } from "uuid";
import SmallStars from "../../oyla/components/SmallStars";
import Image from "next/image";
import Button from "./Button";

export default function Comments({ username, comments, setDashboard }) {
  const options = {
    timeZone: "UTC",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <ul
      className=" w-full
     absolute lg:static lg:pt-0 top-0 left-0 bg-primary-400
     pt-16
     "
    >
      <li className="p-4 lg:hidden">
        <Button
          variant={"danger"}
          onClick={() => setDashboard(false)}
          text={"Geri Dön"}
        />
      </li>
      {comments.map((comment) => (
        <li
          key={uuidv4()}
          className="border-l-0 border-r-0 border
           border-primary-100
     first:border-t-0 last:border-b-0 p-1 flex flex-col lg:flex-row"
        >
          <div className={`text-white h-auto  p-2 flex-1`}>
            <div>
              <div className="flex justify-between items-center">
                <div className="font-heading font-bold ">{username}</div>
                <SmallStars rating={comment.rating} />
              </div>
              {comment.comment && (
                <p className="mt-3 leading-6 max-w-prose">{comment.comment}</p>
              )}
            </div>
            {comment.gif.length > 0 && (
              <div className="mt-4">
                <Image src={comment.gif} width={200} height={200} />
              </div>
            )}
          </div>
          <div className="lg:px-6 pl-2 lg:py-2">
            <div>
              {new Date(comment.updated).toLocaleString("tr-TR", options)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
