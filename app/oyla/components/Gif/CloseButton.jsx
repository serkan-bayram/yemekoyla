export function CloseButton({ setState }) {
  return (
    <button
      onClick={() => {
        setState(false);
      }}
      type="button"
      className={`z-30
        before:my-1 before:block before:w-6 before:h-1 before:rounded-md before:bg-white 
        after:my-1 after:block after:w-6 after:h-1 after:rounded-md after:bg-white 
        before:transition-all after:transition-all
        before:rotate-45 after:-rotate-45 before:translate-y-2 pb-2
        `}
    ></button>
  );
}
