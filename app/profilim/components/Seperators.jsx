export function RightSeperator() {
  return (
    <div
      className="absolute top-0 -right-1 h-full
             w-[1px] py-4"
    >
      <div className="h-full w-[1px] bg-primary-100"></div>
    </div>
  );
}

export function BottomSeperator() {
  return <div className="w-full h-[1px] bg-primary-100 mt-3"></div>;
}
