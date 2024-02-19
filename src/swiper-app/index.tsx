import { TouchEvent, useEffect, useState } from "react";

import HomeLink from "../home-link";

const SwiperApp = () => {
  const [cardIndex, setCardIndex] = useState(0);
  const [cards, setCards] = useState<number[]>(new Array(100).fill(0));

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe) {
      nextCard(isRightSwipe);
    }
  };

  const nextCard = (like: boolean) => {
    setCards((prev) => {
      const newCards = [...prev];
      newCards[cardIndex] = like ? 1 : -1;
      return newCards;
    });
    setCardIndex((prev) => (prev === cards.length - 1 ? prev : prev + 1));
  };

  useEffect(() => {
    document.body.classList.add("overflow-x-hidden");
    document.addEventListener("scroll", (e) => e.preventDefault());
    return () => {
      document.body.classList.remove("overflow-x-hidden");
      document.removeEventListener("scroll", (e) => e.preventDefault());
    };
  }, []);
  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <header className="bg-green-800 p-4 flex flex-row justify-center gap-2 items-center">
        <HomeLink />
        <h1 className="font-bold text-2xl text-white"> Swiper Interaction </h1>
      </header>
      <main className="flex flex-col max-w-full min-h-screen p-2 overflow-hidden">
        {cards.map((val, i) => {
          return (
            <div
              key={`card-${i}`}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className=" w-full flex flex-col relative  items-center justify-center self-center"
            >
              <div
                style={{
                  transform: `translateX(${val * 1800}px)`,
                }}
                className={`p-4 bg-white rounded-xl my-4 absolute border-4 border-black transition-transform ease-in-out duration-500 ${
                  i === cardIndex ? "z-20 -top-2" : "z-10 top-0"
                }`}
              >
                <img
                  src={`https://picsum.photos/240/400?random=${i}`}
                  height="400"
                  width="240"
                  alt={`Card ${i + 1}`}
                />
              </div>
            </div>
          );
        })}
        <div
          className="flex gap-2 absolute items-center justify-center w-full"
          style={{
            top: "550px",
          }}
        >
          <button
            onClick={() => nextCard(false)}
            className="px-4 py-6 w-1/3 bg-red-400 font-bold rounded-xl text-white"
          >
            Dislike
          </button>
          <button
            onClick={() => nextCard(true)}
            className="px-4 py-6 w-1/3 bg-green-400 font-bold rounded-xl text-white"
          >
            Like
          </button>
        </div>
      </main>
    </div>
  );
};

export default SwiperApp;
