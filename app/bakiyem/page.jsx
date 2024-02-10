import Navbar from "../components/Navbar/Navbar";
import { Icon } from "../components/Input/Icon";
import Link from "next/link";
import Form from "./components/Form";
import { getSession } from "../components/Functions/getSession";
import pb from "../components/Functions/authAsAdmin";

function Header() {
  return (
    <h1
      className="mt-24 font-heading lg:text-5xl md:text-4xl text-5xl text-center  font-semibold
           text-white"
    >
      Yemekoyla ile Kolay Bakiye
    </h1>
  );
}

function Callout({ children }) {
  return (
    <div className="text-center  bg-primary-400 p-3 border border-primary-100 rounded-sm">
      {children}
    </div>
  );
}

function SubHeading({ text }) {
  return (
    <h2 className="text-3xl text-white font-heading font-semibold text-start">
      {text}
    </h2>
  );
}

export default async function Page() {
  return (
    <>
      <Navbar />
      <main className="lg:px-24 px-4 pb-8 flex flex-col items-center">
        <Header />
        <div className="lg:mx-60 md:mx-36 mt-12 flex flex-col gap-12">
          <Callout>
            <div className="flex items-center gap-2">
              <Icon name="fa-solid fa-circle-exclamation" />
              Okuldan atılmamak istediğim için bu özellik sadece VIP üyelerimize
              açılmıştır.
            </div>
          </Callout>
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <SubHeading text="Ne işe yarar?" />
              <p className="text-lg font-body">
                Sen vermek bana SOFRA bilgilerini ben vermek sana haber bakiyen
                azaldığı zaman.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <SubHeading text="Güven Çemberi" />
              <p className="text-lg font-body">
                Madem Bilgisayar Mühendisliği öğrencileri olarak bu sayfada
                toplandık nasıl çalıştığını anlatıyorum belki içinize su
                serpilir.
              </p>
              <p className="flex flex-col gap-4">
                Okulun kullanımı çok kolay iki tane API'ı var:
                <span>
                  1- https://sofra.bilecik.edu.tr/OturumAc: Bildiğimiz SOFRA
                  giriş sayfası, kullanımı çok kolay buraya SOFRA bilgilerinizi
                  POST isteği ile gönderiyorum. Bu şekilde belli bir süreliğine
                  SOFRA'daki bütün bilgilere erişebileceğimiz bir Session elde
                  ediyorum.
                </span>
                <span>
                  2- https://sofra.bilecik.edu.tr/Aks/AkilliKartBilgi:
                  Bildiğimiz başka bir SOFRA sayfası, buraya GET isteği atarak
                  kartınızdaki bakiyeleri kontrol ediyorum ve belli bir
                  seviyenin altındaysa Telegram üzerinden mesaj yolluyorum.
                </span>
                <span>
                  Yani anlayacağınız, bu özelliğin çalışması için Yemekoyla
                  hesabınızı Telegram ile bağlamanız lazım, şu linkten
                  yapabilirsiniz:{" "}
                  <Link
                    target="_blank"
                    className="text-accent-400 font-semibold font-body"
                    href={"/telegram"}
                  >
                    Şu Link
                  </Link>
                </span>
                <span>
                  İncelemek isteyenler için Telegram kaynak kodları burda:{" "}
                  <Link
                    target="_blank"
                    className="text-accent-400 font-semibold font-body"
                    href={"https://github.com/serkan-bayram/yemekoyla-telegram"}
                  >
                    https://github.com/serkan-bayram/yemekoyla-telegram
                  </Link>
                  <br />
                  Site kısmının kaynak kodlarını da istek üzerine elden
                  gösteriyorum. 🙏
                </span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <SubHeading text="Güven Çemberinin Kırılması" />
              <p>
                Sonuç olarak SOFRA bilgilerinizi açık açık girmeniz gerekiyor o
                yüzden bence şifrenizi rasgele bir şeye değiştirip öyle girin,
                zaten içerde de çok önemli bir bilgi yok (sanırım).
              </p>
              <Form />
              <span>Bu UI adam olana çok bile</span>
              <span>
                SOFRA şifreni değiştirdiysen ve tekrar kaydetmek istersen direkt
                olarak girebilirsin
              </span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
