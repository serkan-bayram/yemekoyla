import Cards from "./components/Cards";

export default function Page() {
  const backgroundStyles = {
    backgroundColor: "#191b1f",
    backgroundImage: `background-color: #191b1f;
    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23292a33' fill-opacity='0.21'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`,
  };

  return (
    <>
      <div className="w-full px-12 pt-12 pb-36" style={backgroundStyles}>
        <div className="font-heading md:mx-auto md:text-center md:max-w-lg mt-12 text-4xl text-white leading-snug font-bold tracking-wide">
          Bugün yediğin{" "}
          <span className="text-accent tracking-tight">yemekten</span> ne kadar
          memnunsun?
        </div>
        <div className="w-full flex flex-col items-center">
          <button className="hero-button font-body md:w-1/4 mt-12 w-full border border-white py-2 font-bold text-white">
            Kaydol
          </button>
          <div className="text-gray-600 mt-7 font-body">
            Zaten kayıtlı mısın?{" "}
            <button
              className="text-gray-400 ml-1 font-semibold relative
            after:transition-all after:duration-300
            after:h-1 after:bg-white after:absolute after:left-0 after:bottom-0
            after:scale-y-50 underlined-link
            "
            >
              Giriş Yap.
            </button>
          </div>
        </div>
      </div>
      <div className="font-heading tracking-wide mt-16 w-full px-12 flex justify-center text-white text-3xl font-bold">
        Neden?
      </div>
      <div className="grid gap-8 md:grid-cols-3 px-12 mt-16">
        <Cards />
      </div>
    </>
  );
}

// ne kadar kalabalık o kadar hızlı
