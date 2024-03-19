function HighlightedText({ href, text }) {
  return (
    <a
      className="text-accent-400 font-semibold hover:text-accent-300 transition-all"
      target="blank"
      href={href}
    >
      {text}
    </a>
  );
}

function Content1() {
  return (
    <div
      className="tracking-wide leading-relaxed w-full 
      bg-primary-100 font-body p-4 text-white rounded-md"
    >
      E-Posta&apos;nızı almak için ilk olarak{" "}
      <HighlightedText
        text="Sofra"
        href="https://sofra.bilecik.edu.tr/OturumAc"
      />{" "}
      adresine gidin, siteye OBS bilgilerinizle giriş yapabilirsiniz. Daha sonra
      sol taraftaki <b>Öğrenci E-Posta</b> kısmından işleminizi
      tamamlayabilirsiniz.
    </div>
  );
}

function Content2() {
  return (
    <div
      className="tracking-wide leading-relaxed w-full 
      bg-primary-100 font-body p-4 text-white rounded-md"
    >
      E-Posta adresiniz var ama şifresini hatırlamıyorsanız{" "}
      <HighlightedText
        text="bu adrese"
        href="https://sofra.bilecik.edu.tr/YeniParolaOlustur"
      />{" "}
      giderek sıfırlayabilirsiniz.
    </div>
  );
}

function Content3() {
  return (
    <div
      className="tracking-wide leading-relaxed w-full 
    bg-primary-100 font-body p-4 text-white rounded-md"
    >
      Okul E-Posta&apos;larının bir çok kişi tarafından aktif olarak
      kullanılmadığını ve buraya kaydolmak için ekstra zahmet getirdiğinin
      farkındayız fakat daha gerçekçi veriler elde edebilmek için bu yola
      başvurmak zorundayız.
    </div>
  );
}

function Content4() {
  return (
    <div
      className="tracking-wide leading-relaxed w-full 
    bg-primary-100 font-body p-4 text-white rounded-md"
    >
      <HighlightedText
        text="Bu adrese"
        href="https://ogrenci.bilecik.edu.tr/mail/?_task=mail&_mbox=INBOX"
      />{" "}
      giderek E-Posta&apos;nıza giriş yapabilir ve gelecek olan kodu
      alabilirsiniz.
    </div>
  );
}

function Content5() {
  return (
    <div
      className="tracking-wide leading-relaxed w-full 
bg-primary-100 font-body p-4 text-white rounded-md"
    >
      Bu siteyi kurmaktaki amacımız, yemekhane hizmetlerini kötülemek değildir.
      Hedefimiz öğrencilerin düşüncelerini bir endişe duymadan
      paylaşabilecekleri bir ortam oluşturmaktır. Biz daha iyi hizmete giden
      yolun doğru iletişimden geçtiğini düşünüyoruz ve yemekhane hizmetini veren
      firmaların gerçekçi geri dönüşlerle daha fazla iyileşebileceğine
      inanıyoruz.
    </div>
  );
}

export default function AccordionContent({ content, isOpen }) {
  let ContentComponent = null;

  if (content === "Content1") {
    ContentComponent = Content1;
  }

  if (content === "Content2") {
    ContentComponent = Content2;
  }

  // if (content === "Content3") {
  //   ContentComponent = Content3;
  // }

  if (content === "Content4") {
    ContentComponent = Content4;
  }

  if (content === "Content5") {
    ContentComponent = Content5;
  }

  return (
    <div
      className={`transition-all duration-300 grid ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        {ContentComponent ? <ContentComponent /> : null}
      </div>
    </div>
  );
}
