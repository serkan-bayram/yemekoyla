"use client";

import { useEffect, useRef, useState } from "react";

export default function Textarea({ comment, setComment }) {
  const ref = useRef(0);

  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    // Calculate divWidth after the component has mounted
    if (ref.current) {
      setDivWidth(ref.current.offsetWidth);
    }
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

  const progressbarCalculation = divWidth / 280;

  const commentLength = comment.length;

  const progressbarWidth = (commentLength * progressbarCalculation).toFixed(0);

  return (
    <div>
      <div ref={ref} className="relative mt-2 rounded-md overflow-hidden ">
        <textarea
          defaultValue={comment}
          autoFocus={false}
          maxLength={"280"}
          name="comment"
          rows={5}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Yemek hakkındaki düşüncelerin?"
          className="resize-none w-full focus:border-2
           bg-transparent rounded-md
           border border-primary-200 p-2
           placeholder:font-body
            placeholder:text-md
            overflow-y-hidden
             appearance-none outline-none placeholder:text-gray-500 text-white text-md
             
             "
        ></textarea>
        <div
          style={{
            width: `${progressbarWidth}px` || "1px",
          }}
          className={`absolute bottom-[6px] rounded-bl-sm ${
            parseInt(progressbarWidth) === divWidth
              ? "rounded-br-sm"
              : "rounded-br-sm rounded-tr-sm"
          }
       left-0 bg-accent-400 h-1`}
        ></div>
      </div>
    </div>
  );
}
