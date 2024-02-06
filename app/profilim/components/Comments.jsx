import { v4 as uuidv4 } from "uuid";
import SmallStars from "../../oyla/components/SmallStars";
import Image from "next/image";
import { Icon } from "../../components/Input/Icon";
import Button from "./Button";

export default function Comments({
  username,
  comments,
  setDashboard,
  setComment,
  setPopup,
}) {
  const handleClick = (comment) => {
    setPopup("commentDetails");
    setComment(comment);
  };

  return (
    <ul
      className=" w-full
     absolute lg:static lg:pt-0 top-0 left-0 bg-primary-400
     pt-16
     "
    >
      <li className="p-4 lg:hidden ">
        <button
          className="scale-105 flex gap-2 items-center"
          onClick={() => setDashboard(false)}
        >
          <Icon name="fa-solid fa-angle-left" /> Geri Dön
        </button>
      </li>
      {comments.map((comment) => (
        <li
          key={uuidv4()}
          className="border-l-0 border-r-0 border
           border-primary-100
     first:border-t-0 last:border-b-0 p-1 my-4 py-4 flex gap-6 flex-col lg:flex-row"
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
                <Image alt="gif" src={comment.gif} width={200} height={200} />
              </div>
            )}
          </div>
          <div className="p-2 lg:p-0 ">
            <Button
              onClick={() => handleClick(comment)}
              text="Ayrıntıları Gör"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
