import HomeLink from "../home-link";

const GlassyCards = () => {
  return (
    <div className="flex flex-col w-screen h-full">
      <header className="bg-orange-400 flex flex-row items-center w-full justify-center font-bold lg:justify-center lg:gap-6 py-4 px-2">
        <HomeLink />
        <h1 className="text-2xl font-bold">Glassy Cards</h1>
      </header>

      <main className="flex flex-col w-screen min-h-screen items-center py-8 px-4 bg-black text-white">
        <div className="flex flex-col gap-20 w-full my-12">
          <div
            className="flex w-full bg-gray-100 bg-opacity-10 px-4 py-12 overflow-visible relative justify-between"
            style={{
              maxHeight: "400px",
              borderRadius: "40px",
            }}
          >
            <div className="flex flex-col w-2/3 gap-4 items-baseline">
              <h2 className="text-5xl font-bold">Plant 1</h2>
              <p className="text-lg">Some text</p>
            </div>
            <img
              src="/plant1.png"
              alt="Plant 1"
              style={{
                objectFit: "contain",
                bottom: "10px",
              }}
              className="w-1/3 absolute right-0"
            />
          </div>
          <div
            className="flex w-full bg-white bg-opacity-10 px-4 py-12 overflow-visible relative justify-between"
            style={{
              maxHeight: "400px",
              borderRadius: "40px",
            }}
          >
            <div className="flex flex-col w-2/3 gap-4 items-baseline">
              <h2 className="text-5xl font-bold">Plant 2</h2>
              <p className="text-lg">Some text</p>
            </div>
            <img
              src="/plant2.png"
              alt="Plant 2"
              style={{
                objectFit: "contain",
                bottom: "-40px",
              }}
              className="w-1/3 absolute right-0"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GlassyCards;
