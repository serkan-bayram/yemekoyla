function HighlightedText({ href, text }) {
  return (
    <a
      className="text-accent font-semibold hover:text-lightAccent transition-all"
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
    bg-primary font-body p-4 text-white rounded-md"
    >
      E-posta&apos;nızı almak için ilk olarak{" "}
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
    bg-primary font-body p-4 text-white rounded-md"
    >
      E-posta adresiniz var ama şifresini hatırlamıyorsanız{" "}
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
    bg-primary font-body p-4 text-white rounded-md"
    >
      Okul E-posta&apos;larının bir çok kişi tarafından aktif olarak
      kullanılmadığını ve buraya kaydolmak için ekstra zahmet getirdiğinin
      farkındayız fakat, daha gerçekçi veriler elde edebilmek için malesef bu
      yola başvurmak zorundayız.
    </div>
  );
}

function Content4() {
  return (
    <div
      className="tracking-wide leading-relaxed w-full 
    bg-primary font-body p-4 text-white rounded-md"
    >
      <HighlightedText
        text="Bu adrese"
        href="https://ogrenci.bilecik.edu.tr/mail/?_task=mail&_mbox=INBOX"
      />{" "}
      giderek E-posta&apos;nıza giriş yapabilir ve gelecek olan kodu
      alabilirsiniz.
    </div>
  );
}

export default function AccordionContent({ content, isOpen }) {
  let ContentComponent;

  if (content === "Content1") {
    ContentComponent = Content1;
  }

  if (content === "Content2") {
    ContentComponent = Content2;
  }

  if (content === "Content3") {
    ContentComponent = Content3;
  }

  if (content === "Content4") {
    ContentComponent = Content4;
  }

  return (
    <div
      className={`transition-all duration-300 grid ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        {<ContentComponent /> ? <ContentComponent /> : null}
      </div>
    </div>
  );
}
