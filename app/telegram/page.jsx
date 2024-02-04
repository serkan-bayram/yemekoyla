import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import Form from "./components/Form";
import Footer from "../(landing)/components/Footer";
import pb from "../components/Functions/authAsAdmin";
import { getSession } from "../components/Functions/getSession";

function Header() {
  return (
    <h1
      className="mt-24 font-heading lg:text-5xl md:text-4xl text-5xl text-center  font-semibold
         text-white"
    >
      Artık Daha Kolay: <span className="text-accent-400">Telegram</span>
    </h1>
  );
}

function Paragraph({ text }) {
  return <p className="text-white text-lg font-body ">{text}</p>;
}

function SubHeading({ text }) {
  return (
    <h2 className="text-3xl text-white font-heading font-semibold text-start">
      {text}
    </h2>
  );
}

function HighlightedLink({ href, text }) {
  return (
    <span>
      <Link
        className="text-accent-400 font-semibold hover:text-accent-300"
        href={href}
      >
        {text}
      </Link>
    </span>
  );
}

function HighlightedText({ text }) {
  return <span className="text-accent-400 font-semibold">{text}</span>;
}

function Callout({ children }) {
  return (
    <div className="text-center  bg-primary-400 p-3 border border-primary-100 rounded-sm">
      {children}
    </div>
  );
}

export default async function Page() {
  const { session } = await getSession();

  const user =
    session && (await pb.collection("users").getOne(session.user.record.id));

  const isTelegramVerified = user && user.isTelegramVerified;

  return (
    <>
      <Navbar />
      <main className="lg:px-24 px-4 pb-8 flex flex-col items-center">
        <Header />
        <div className="lg:mx-60 md:mx-36 mt-12 flex flex-col gap-12">
          <Paragraph
            text="Yemekhane yemeklerini iyileştirme çabamızda sizlere olabildiğince kolaylık
      sağlama adına yeni bir yol deniyoruz: Değerlendirmelerinizi siteye giriş
      yapmaya ihtiyaç duymadan direkt Telegram grubumuz üzerinden
      yapabileceksiniz."
          />
          <div className="w-full flex flex-col gap-5">
            <SubHeading text={"Nasıl?"} />
            <p className="text-lg font-body">
              Bu kolaylığı sağlayabilmemiz için öğrenci olduğunuzu doğrulamamız
              gerekiyor, bu sebeple ilk olarak{" "}
              <HighlightedLink
                href={"http://yemekhane-puanla.vercel.app/giris"}
                text={"Yemekoyla"}
              />{" "}
              hesabınıza giriş yapmalısınız.
            </p>
            <p className="text-lg font-body">
              İkincil olarak Telegram üzerinden{" "}
              <HighlightedText text={"@YemekoylaBot"} />
              &apos;u bulun ve /bagla komuduyla beraber Yemekoyla kullanıcı
              adınızı girin.
            </p>
            <Callout>Örnek: /bagla lezzetlerinefendisi</Callout>
            <p className="text-lg">
              Ardından gelecek olan doğrulamak kodunu aşağıya girerek hesap
              bağlama işlemini tamamlayabilirsiniz.
            </p>
            {user ? (
              !isTelegramVerified ? (
                <Form />
              ) : (
                <Callout>Telegram hesabınız başarıyla bağlandı. 👌</Callout>
              )
            ) : (
              <Callout>
                Hesabınızı bağlamak için{" "}
                <HighlightedLink href={"/giris"} text={"Giriş Yapın."} />
              </Callout>
            )}
          </div>
          <div className="w-full flex flex-col gap-5">
            <SubHeading text={"Bundan sonrası ve bilinmesi gerekenler"} />
            <Callout>
              Telegram Grubunun Linki:{" "}
              <span className="text-accent-400 font-semibold hover:text-accent-300">
                <Link target="_blank" href={"https://t.me/+6jwwLXfdU7VkNjdk"}>
                  https://t.me/+6jwwLXfdU7VkNjdk
                </Link>
              </span>
            </Callout>
            <p className="text-lg font-body">
              Oy verebilmek için gruba girmelisiniz, anket her gün yemek
              paylaşıldıktan bir kaç saat sonra yayınlanıyor. Bir{" "}
              <HighlightedText text={"Yemekoyla"} /> hesabınız yoksa bile gruba
              girip günün yemeğini paylaşıldığı anda cebinizde görebilirsiniz ve
              oy verebilirsiniz, ancak verdiğiniz oylar kaydedilmeyecektir.
            </p>
            <p className="text-lg font-body">
              Artık Telegram üzerinden oy verebildiğimize göre sitenin bir
              gereksinimi kalmadı mı? Kısa cevap, hayır. Telegram üzerindeki
              kontrolümüz sınırlı olduğundan hala temel olarak burası ele
              alınacaktır, ayrıca yorum eklemek veya başkalarının yorumlarını
              görmek isterseniz burayı tercih etmelisiniz.
            </p>
            <p className="text-lg font-body">
              Telegram&apos;ı vaktiniz olmadığında veya siteye girmekle uğraşmak
              istemediğiniz de kullanmanızı tavsiye ediyoruz. Ekstra
              ekleyeceğiniz yorumlar yemekleri iyileştirme açısından çok önemli.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
