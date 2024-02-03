import Link from "next/link";
import Navbar from "../components/Navbar/Navbar";
import Form from "./components/Form";
import Footer from "../(landing)/components/Footer";
import pb from "../components/Functions/authAsAdmin";
import { getSession } from "../components/Functions/getSession";

export default async function Page() {
  const { session } = await getSession();

  const user = await pb.collection("users").getOne(session.user.record.id);

  const isTelegramVerified = user.isTelegramVerified;

  return (
    <>
      <Navbar />
      <main className="lg:px-24 px-4 pb-8 flex flex-col items-center">
        <h1
          className="mt-24 font-heading text-5xl  font-semibold
         text-white"
        >
          Artık Daha Kolay: <span className="text-accent-400">Telegram</span>
        </h1>
        <div className="mx-60 mt-12 flex flex-col gap-12">
          <p className="text-white text-lg font-body">
            Yemekhane yemeklerini iyileştirme çabamızda sizlere olabildiğince
            kolaylık sağlama adına yeni bir yol deniyoruz: Değerlendirmelerinizi
            siteye giriş yapmaya ihtiyaç duymadan direkt Telegram grubumuz
            üzerinden yapabileceksiniz.{" "}
          </p>
          <div className="w-full flex flex-col gap-5">
            <h2 className="text-3xl text-white font-heading font-semibold text-start">
              Nasıl?
            </h2>
            <p className="text-lg font-body">
              Bu kolaylığı sağlayabilmemiz için öğrenci olduğunuzu doğrulamamız
              gerekiyor, bu sebeple ilk olarak{" "}
              <span>
                <Link
                  className="text-accent-400 font-semibold hover:text-accent-300"
                  href="http://yemekhane-puanla.vercel.app/giris"
                >
                  Yemekoyla
                </Link>
              </span>{" "}
              hesabınıza giriş yapmalısınız.
            </p>
            <p className="text-lg font-body">
              İkincil olarak Telegram üzerinden{" "}
              <span className="text-accent-400 font-semibold">
                @YemekoylaBot
              </span>
              'u bulun ve /bagla komuduyla beraber Yemekoyla kullanıcı adınızı
              girin.
              <div className="bg-primary-400 p-3 mt-2 border border-primary-100 rounded-sm">
                Örnek: /bagla lezzetlerinefendisi
              </div>
            </p>
            <p className="text-lg">
              Ardından gelecek olan doğrulamak kodunu aşağıya girerek hesap
              bağlama işlemini tamamlayabilirsiniz.
            </p>
            {!isTelegramVerified ? (
              <Form />
            ) : (
              <h1 className="text-center font-semibold bg-primary-400 p-3 border border-primary-100 rounded-sm">
                Telegram hesabınız başarıyla bağlandı. 👌
              </h1>
            )}
          </div>
          <div className="w-full flex flex-col gap-5">
            <h2 className="text-3xl text-white font-heading font-semibold text-start">
              Bundan sonrası ve bilinmesi gerekenler
            </h2>
            <p className="text-lg font-body">
              Oy verebilmek için gruba girmelisiniz, anket her gün yemek
              paylaşıldıktan bir kaç saat sonra yayınlanıyor. Bir{" "}
              <span className="text-accent-400 font-semibold">Yemekoyla</span>{" "}
              hesabınız yoksa bile gruba girip günün yemeğini paylaşıldığı anda
              cebinizde görebilirsiniz ve oy verebilirsiniz, ancak verdiğiniz
              oylar kaydedilmeyecektir.
            </p>
            <p className="text-lg font-body">
              Artık Telegram üzerinden oy verebildiğimize göre sitenin bir
              gereksinimi kalmadı mı? Kısa cevap, hayır. Telegram üzerindeki
              kontrolümüz sınırlı olduğundan hala temel olarak burası ele
              alınacaktır, ayrıca yorum eklemek veya başkalarının yorumlarını
              görmek isterseniz burayı tercih etmelisiniz.
            </p>
            <p className="text-lg font-body">
              Telegram'ı vaktiniz olmadığında veya siteye girmekle uğraşmak
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
