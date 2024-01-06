import { v4 as uuidv4 } from "uuid";
import FlexContainer from "./FlexContainer";

export default function Values() {
  const values = [
    {
      title: "Daha kalabalık",
      accent: "Daha hızlı",
      content:
        "Yemekhane yemeklerini iyileştirme adına çıktığımız bu yolda hep beraber ilerliyoruz, ne kadar fazla sesimiz olursa o kadar çabuk bir etki görebiliriz.",
      buttonText: "Bir göz at",
      imageSrc: "/group.png",
      imageAlt: "Topluluk",
    },
    {
      title: "Yorumlarınızın",
      accent: "Değeri",
      content:
        "Yaptığınız her eleştirinin bir karşılık bulmasını hedefliyoruz, o yüzden aklınızdakini dışarı vurmaktan sakınmayın, unutmayın ki yemek bir ödül değil haktır.",
      buttonText: "Fikrini belirt",
      imageSrc: "/value.png",
      imageAlt: "Değer",
      isReverse: true,
    },
    {
      title: "Verilerinizin",
      accent: "Gizliliği",
      content:
        "Kaydolurken girdiğiniz E-Posta’ları sadece kimlik doğrulama için kullanıyoruz ve 3. şahıslar ile asla paylaşmıyoruz.",
      buttonText: "Kaydol",
      imageSrc: "/data-encryption.png",
      imageAlt: "Şifreleme",
    },
  ];

  return (
    <div className="xl:px-56 lg:px-48 px-4 lg:py-48 py-20 lg:gap-36 gap-12">
      <div className="grid lg:grid-flow-row items-center gap-24 ">
        {values.map((value) => (
          <FlexContainer key={uuidv4()} {...value} />
        ))}
      </div>
    </div>
  );
}
