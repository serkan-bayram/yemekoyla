import Image from "next/image";

export function Icon({ name }) {
  // Return nothing if there is not an name
  if (!!name === null) return;

  return <i className={`${name} text-lg text-fade-400`} />;
}
