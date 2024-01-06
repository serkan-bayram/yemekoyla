"use client";
import { useRef } from "react";
import { useTextReveal } from "./useTextReveal";

export function Description() {
  const ref = useRef(null);

  const text =
    "Öğrencilerle yetkililer arasında kolaylıkla erişilebilen bir bağlantı noktası oluşturuyor, doğrulanmış kullanıcıların yaptığı değerlendirmeleri anonim bir şekilde yetkili birimlere aktarıyoruz.";

  useTextReveal(ref, text);

  return (
    <p
      ref={ref}
      className="tracking-tight lg:text-2xl 
      text-lg max-w-3xl mt-8 font-body text-center "
    >
      <span>{text}</span>
    </p>
  );
}
